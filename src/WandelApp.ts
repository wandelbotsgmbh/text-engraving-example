import type {
  ControllerInstance,
  MotionGroupPhysical,
} from "@wandelbots/wandelbots-api-client"
import { flatten, keyBy } from "lodash-es"
import { makeAutoObservable } from "mobx"
import { ConnectedMotionGroup } from "@wandelbots/wandelbots-api-wrapper/ConnectedMotionGroup"
import { getWandelApi } from "./getWandelApi"
import { env } from "./runtimeEnv"
import type { WandelAPIWrapper } from "@wandelbots/wandelbots-api-wrapper"
import { ProgramRunner } from "@wandelbots/wandelbots-api-wrapper/ProgramRunner"

export type MotionGroupOption = {
  selectionId: string
} & MotionGroupPhysical

/**
 * Main store for the current state of the robot pad.
 */
export class WandelApp {
  selectedMotionGroupId: string | null = null

  programRunner: ProgramRunner | null = null

  /**
   * Represents the current state of the selected motion group
   * after setup and websocket connection */
  activeRobot: ConnectedMotionGroup | null = null

  constructor(
    readonly api: WandelAPIWrapper,
    readonly cellId: string,
    readonly availableControllers: ControllerInstance[],
  ) {
    ;(window as any).wandelApp = this
    makeAutoObservable(this)
  }

  get motionGroupOptions() {
    return flatten(
      this.availableControllers.map(
        (controller) => controller.physical_motion_groups,
      ),
    )
  }

  get motionGroupOptionsById() {
    return keyBy(this.motionGroupOptions, (mg) => mg.motion_group)
  }

  get motionGroup() {
    if (!this.selectedMotionGroupId) return null

    const motionGroup = this.motionGroupOptionsById[this.selectedMotionGroupId]
    if (!motionGroup) {
      throw new Error(
        `Invalid motion group selection id ${this.selectedMotionGroupId}`,
      )
    }
    return motionGroup
  }

  async selectMotionGroup(motionGroupId: string) {
    this.activeRobot = await getWandelApi().connectMotionGroup(env.CELL_ID!, motionGroupId)
  }

  async startProgramRunner() {
    this.programRunner = new ProgramRunner(this.api, this.cellId)
  }

}
