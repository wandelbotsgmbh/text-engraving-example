import type { Configuration } from "@wandelbots/wandelbots-api-client"

import {
  ControllerApi,
  DeviceConfigurationApi,
  ProgramApi,
  MotionGroupApi,
  MotionGroupJoggingApi,
  MotionGroupInfosApi,
  LibraryProgramApi,
  LibraryProgramMetadataApi,
  ControllerIOsApi,
  VirtualRobotModeApi,
  CoordinateSystemsApi,
  MotionApi,
  ProgramValuesApi,
} from "@wandelbots/wandelbots-api-client"
import { ConnectedMotionGroup } from "./ConnectedMotionGroup"
import { Log } from "./Log"

export type WandelAPIWrapperConfig = Configuration

export class WandelAPIWrapper {
  constructor(readonly config: WandelAPIWrapperConfig) {}

  readonly controller = new ControllerApi(this.config)
  readonly coordinateSystems = new CoordinateSystemsApi(this.config)
  readonly motion = new MotionApi(this.config)
  readonly motionGroup = new MotionGroupApi(this.config)
  readonly motionGroupInfos = new MotionGroupInfosApi(this.config)
  readonly motionGroupJogging = new MotionGroupJoggingApi(this.config)
  readonly program = new ProgramApi(this.config)
  readonly programValues = new ProgramValuesApi(this.config)
  readonly deviceconfig = new DeviceConfigurationApi(this.config)
  readonly libraryProgram = new LibraryProgramApi(this.config)
  readonly libraryProgramMetadata = new LibraryProgramMetadataApi(
    this.config,
  )
  readonly controllerIOsApi = new ControllerIOsApi(this.config)
  readonly virtualRobotMode = new VirtualRobotModeApi(this.config)

  Log = new Log()

  async connectMotionGroups(cellId: string, motionGroupIds: string[]): Promise<ConnectedMotionGroup[]> {
    const { data: controllersRes } = await this.controller.listControllers(cellId)

    return Promise.all(motionGroupIds.map(motionGroupId =>
       ConnectedMotionGroup.connect(this, cellId, motionGroupId, controllersRes.instances)
    ))
  }

  async connectMotionGroup(cellId: string, motionGroupId: string): Promise<ConnectedMotionGroup> {
    const motionGroups = await this.connectMotionGroups(cellId, [motionGroupId])
    return motionGroups[0]!
  }
}


