import { tryParseJson } from "./util/converters"
import type {
  ControllerInstance,
  MotionGroupPhysical,
  MotionGroupSpecification,
  MotionGroupState,
  RobotTcp,
} from "@wandelbots/wandelbots-api-client"
import { makeAutoObservable } from "mobx"
import { AutoReconnectingWebsocket } from "./util/AutoReconnectingWebsocket"
import { WandelAPIWrapper } from "."
import { AxiosError } from "axios"

export type MotionGroupOption = {
  selectionId: string
} & MotionGroupPhysical

/**
 * Store representing the current state of a connected motion group.
 */
export class ConnectedMotionGroup {
  static async connect(api: WandelAPIWrapper, cellId: string, motionGroupId: string, controllers: ControllerInstance[]) {
    const [_motionGroupIndex, controllerId] = motionGroupId.split("@") as [string, string]
    const controller = controllers.find(c => c.controller === controllerId)
    const motionGroup = controller?.physical_motion_groups.find(mg => mg.motion_group === motionGroupId)
    if (!controller || !motionGroup) {
      throw new Error(`Controller ${controllerId} or motion group ${motionGroupId} not found`)
    }

    const motionStateSocket = new AutoReconnectingWebsocket(
      `${api.config.basePath}/cells/${cellId}/motion-groups/${motionGroupId}/state-stream`,
      api.config.username,
      api.config.password,
    )

    // Wait for the first message to get the initial state
    const firstMessage = await motionStateSocket.firstMessage()
    const initialMotionState = tryParseJson(firstMessage.data)?.result?.state

    if (!initialMotionState) {
      throw new Error(
        `Unable to parse initial motion state message ${firstMessage.data}`,
      )
    }

    console.log(
      `Connected motion state websocket to motion group ${motionGroupId}. Initial state:\n  `,
      initialMotionState,
    )

    // This is used to determine if the robot is virtual or physical
    let isVirtual = false
    try {
      const virtualModeRes = await api.virtualRobotMode.getOperationMode(
        cellId,
        controllerId,
      )

      if (virtualModeRes.status === 200) {
        isVirtual = true
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(
          `Received ${err.status} from getOperationMode, concluding that ${controllerId} is physical`,
        )
      } else {
        throw err
      }
    }

    // Find out what TCPs this motion group has (we need it for jogging)
    const tcpOptionsRes = await api.motionGroupInfos.listTcps(
      cellId,
      motionGroupId,
    )

    const motionGroupSpecification =
      await api.motionGroupInfos.getMotionGroupSpecification(
        cellId,
        motionGroupId,
      )

      return new ConnectedMotionGroup(
        api,
        controller,
        motionGroup,
        initialMotionState,
        motionStateSocket,
        isVirtual,
        tcpOptionsRes.data.tcps!,
        motionGroupSpecification.data,
      )
  }

  connectedJoggingCartesianSocket: WebSocket | null = null
  connectedJoggingJointsSocket: WebSocket | null = null
  planData: any | null // tmp
  joggingVelocity: number = 10

  // Not mobx-observable as this changes very fast; should be observed
  // using animation frames
  rapidlyChangingMotionState: MotionGroupState

  constructor(
    readonly api: WandelAPIWrapper,
    readonly controller: ControllerInstance,
    readonly motionGroup: MotionGroupPhysical,
    readonly initialMotionState: MotionGroupState,
    readonly motionStateSocket: AutoReconnectingWebsocket,
    readonly isVirtual: boolean,
    readonly tcps: RobotTcp[],
    readonly motionGroupSpecification: MotionGroupSpecification,
  ) {
    this.rapidlyChangingMotionState = initialMotionState

    motionStateSocket.addEventListener("message", (event) => {
      const data = tryParseJson(event.data)?.result?.state

      if (!data) {
        console.error("Invalid motion state data", event.data)
        return
      }

      this.rapidlyChangingMotionState = data
    })

    makeAutoObservable(
      this,
      {
        rapidlyChangingMotionState: false,
      },
      { autoBind: true },
    )
  }

  get motionGroupId() {
    return this.motionGroup.motion_group
  }

  get controllerId() {
    return this.controller.controller
  }

  get modelFromController() {
    return this.motionGroup.model_from_controller
  }

  get wandelscriptIdentifier() {
    const num = this.motionGroupId.split("@")[0]
    return `${this.controllerId.replaceAll("-", "_")}_${num}`
  }

  /** Jogging velocity in radians for rotation and joint movement */
  get joggingVelocityRads() {
    return (this.joggingVelocity * Math.PI) / 180
  }

  get joints() {
    return this.initialMotionState.joint_position.joints.map((_, i) => {
      return {
        index: i,
      }
    })
  }

  get dhParameters() {
    return this.motionGroupSpecification.dh_parameters
  }

  dispose() {
    this.motionStateSocket.close()
    if (this.connectedJoggingCartesianSocket)
      this.connectedJoggingCartesianSocket.close()
    if (this.connectedJoggingJointsSocket)
      this.connectedJoggingJointsSocket.close()
  }

  setJoggingVelocity(velocity: number) {
    this.joggingVelocity = velocity
  }
}
