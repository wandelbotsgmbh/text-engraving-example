import { makeAutoObservable, runInAction, type IReactionDisposer } from "mobx"
import { AxiosError } from "axios"
import z from "zod"
import { AutoReconnectingWebsocket } from "@wandelbots/wandelbots-api-wrapper/util/AutoReconnectingWebsocket"
import { tryParseJson } from "@wandelbots/wandelbots-api-wrapper/util/converters"
import type { WandelAPIWrapper } from "."
import type { ConnectedMotionGroup } from "./ConnectedMotionGroup"

export enum ProgramState {
  NotStarted = "not started",
  Running = "running",
  Stopped = "stopped",
  Failed = "failed",
  Completed = "completed",
}

export type CurrentProgram = {
  id?: string
  wandelscript?: string
  state?: ProgramState
}

const programStateMessageSchema = z.object({
  id: z.string(),
  state: z.enum(["not started", "running", "stopped", "failed", "completed"]),
  start_time: z.number().nullable(),
  execution_time: z.number().nullable(),
})

type ProgramStateMessage = z.infer<typeof programStateMessageSchema>

export class ProgramRunner {
  api: WandelAPIWrapper;
  cellId: string;

  /* If the program library service broke, we want to let the user know */
  programLoadError: AxiosError | null = null

  currentProgram: CurrentProgram = {}

  executionState = "idle" as "idle" | "starting" | "executing" | "stopping"
  currentlyExecutingProgramRunnerId = null as string | null

  programStateSocket: AutoReconnectingWebsocket

  disposers: IReactionDisposer[] = []

  constructor(api: WandelAPIWrapper, cellId: string) {
    makeAutoObservable(this, {}, { autoBind: true })

    this.api = api;
    this.cellId = cellId;

    this.programStateSocket = new AutoReconnectingWebsocket(`
      ${api.config.basePath}/cells/${cellId}/programs/state
    `)

    this.programStateSocket.addEventListener("message", (ev) => {
      const { data: msg, error } = programStateMessageSchema.safeParse(
        tryParseJson(ev.data),
      )

      if (!msg) {
        console.error(
          "Failed to parse program state message",
          error.toString(),
          ev.data,
        )
        return
      }

      this.handleProgramStateMessage(msg)
    })
  }

  /** Handle a program state update from the backend */
  async handleProgramStateMessage(msg: ProgramStateMessage) {

    // Ignoring other programs for now
    // TODO - show if execution state is busy from another source
    if (msg.id !== this.currentlyExecutingProgramRunnerId) return

    if (msg.state === ProgramState.Failed) {
      try {
        const { data: runnerState } =
          await this.api.program.getProgramRunner(this.cellId, msg.id)

        // TODO - wandelengine should send print statements in real time over
        // websocket as well, rather than at the end
        const stdout = (runnerState as any).stdout
        if (stdout) {
          this.api.Log.log(stdout)
        }
        this.api.Log.logError(
          `Program runner ${msg.id} failed with error: ${runnerState.error}\n${runnerState.traceback}`,
        )
      } catch (err) {
        this.api.Log.logError(
          `Failed to retrieve results for program ${msg.id}: ${err}`,
        )
      }

      this.currentProgram.state = ProgramState.Failed

      this.gotoIdleState()
    } else if (msg.state === ProgramState.Stopped) {
      try {
        const { data: runnerState } =
          await this.api.program.getProgramRunner(this.cellId, msg.id)

        const stdout = (runnerState as any).stdout
        if (stdout) {
          this.api.Log.log(stdout)
        }

        this.currentProgram.state = ProgramState.Stopped
        this.api.Log.log(`Program runner ${msg.id} stopped`)
      } catch (err) {
        this.api.Log.logError(
          `Failed to retrieve results for program ${msg.id}: ${err}`,
        )
      }

      this.gotoIdleState()
    } else if (msg.state === ProgramState.Completed) {
      try {
        const { data: runnerState } =
          await this.api.program.getProgramRunner(this.cellId, msg.id)

        const stdout = (runnerState as any).stdout
        if (stdout) {
          this.api.Log.log(stdout)
        }
        this.api.Log.log(
          `Program runner ${msg.id} finished successfully in ${msg.execution_time?.toFixed(2)} seconds`,
        )

        this.currentProgram.state = ProgramState.Completed
      } catch (err) {
        this.api.Log.logError(
          `Failed to retrieve results for program ${msg.id}: ${err}`,
        )
      }

      this.gotoIdleState()
    } else if (msg.state === ProgramState.Running) {
      this.currentProgram.state = ProgramState.Running
      this.api.Log.log(`Program runner ${msg.id} now running`)
    } else if (msg.state !== ProgramState.NotStarted) {
      console.error(msg)
      this.api.Log.logError(
        `Program runner ${msg.id} entered unexpected state: ${msg.state}`,
      )
      this.currentProgram.state = ProgramState.NotStarted
      this.gotoIdleState()
    }
  }

  /** Call when a program is no longer executing */
  gotoIdleState() {
    this.executionState = "idle"
    this.currentlyExecutingProgramRunnerId = null
  }

  async executeProgram(wandelscript: string, initial_state?: Object, activeRobot?: ConnectedMotionGroup) {
    this.currentProgram = {
      wandelscript: wandelscript,
      state: ProgramState.NotStarted,
    }

    const { currentProgram: openProgram } = this
    if (!openProgram) return

    runInAction(() => {
      this.executionState = "starting"
    })

    // Jogging can cause program execution to fail for some time after
    // So we need to explicitly stop jogging before running a program
    if (activeRobot) {
      try {
        await this.api.motionGroupJogging.stopJogging(
          this.cellId,
          activeRobot.motionGroupId,
        )
      } catch (err) {
        console.error(err)
      }
    }

    // WOS-1539: Wandelengine parser currently breaks if there are empty lines with indentation
    const trimmedCode = openProgram.wandelscript!.replaceAll(/^\s*$/gm, "")

    try {
      const { data: programRunnerRef } =
        await this.api.program.createProgramRunner(
          this.cellId,
          {
            code: trimmedCode,
            initial_state: initial_state,
            default_robot: activeRobot?.wandelscriptIdentifier,
          } as any,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

      this.api.Log.log(
        `Created program runner ${programRunnerRef.id}"`,
      )

      runInAction(() => {
        this.executionState = "executing"
        this.currentlyExecutingProgramRunnerId = programRunnerRef.id
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.request) {
        this.api.Log.logError(
          `${error.response.status} ${error.response.statusText} from ${error.response.config.url} ${JSON.stringify(error.response.data)}`,
        )
      } else {
        this.api.Log.logError(JSON.stringify(error))
      }
      runInAction(() => {
        this.executionState = "idle"
      })
    }
  }

  async stopProgram() {
    if (!this.currentlyExecutingProgramRunnerId) return

    runInAction(() => {
      this.executionState = "stopping"
    })

    try {
      await this.api.program.stopProgramRunner(
        this.cellId,
        this.currentlyExecutingProgramRunnerId,
      )
    } catch (err) {
      runInAction(() => {
        // Reactivate the stop button so user can try again
        this.executionState = "executing"
      })
      throw err
    }
  }

  reset() {
    this.currentProgram = {}
  }

}
