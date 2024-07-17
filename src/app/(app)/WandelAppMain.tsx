"use client"

import { observer } from "mobx-react-lite"
import { useWandelApp } from "../../WandelAppContext"
import { LoadingScreen } from "./LoadingScreen"
import { NoMotionGroupModal } from "../../components/NoMotionGroupModal"
import TextEngraving from "../../text-engraving/TextEngraving"

export const WandelAppMain = observer(() => {
  const wandelApp = useWandelApp()

  if (!wandelApp.motionGroupOptions.length) {
    // No robots (virtual or otherwise)! We can't do much without a robot.
    return <NoMotionGroupModal />
  }

  // Everything below this point expects an active robot
  if (!wandelApp.activeRobot) {
    return <LoadingScreen />
  }

  return (
    <>
      <TextEngraving />
    </>
  )
})
