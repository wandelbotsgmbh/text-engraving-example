"use client"

import { env } from "../../runtimeEnv"
import { getWandelApi } from "../../getWandelApi"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect, type ReactNode } from "react"
import { LoadingScreen } from "./LoadingScreen"
import { WandelApp } from "../../WandelApp"
import { WandelAppContext } from "../../WandelAppContext"

export const WandelAppLoader = observer((props: { children: ReactNode }) => {
  const api = getWandelApi()

  const state = useLocalObservable(() => ({
    loading: "Initializing" as string | null,
    error: null as unknown | null,
    wandelApp: null as WandelApp | null,

    finishLoading() {
      state.loading = null
    },

    nowLoading(message: string) {
      state.loading = message
    },

    receiveError(error: unknown) {
      console.error(error)
      state.error = error
    },
  }))

  async function loadWandelApp() {
    const cell = env.CELL_ID ?? "cell"

    state.nowLoading(`Loading controllers`)

    const controllersRes = await api.controller.listControllers(cell)
    const availableControllers = controllersRes.data.instances

    console.log(`Available controllers:\n  `, availableControllers)

    state.wandelApp = new WandelApp(api, cell, availableControllers)

    if (!state.wandelApp.selectedMotionGroupId) {
      // No saved motion group, try to select the first available
      const motionGroup = state.wandelApp.motionGroupOptions[0]
      if (motionGroup) {
        state.nowLoading(`Configuring motion group`)
        await state.wandelApp.selectMotionGroup(motionGroup.motion_group)
      }
    }

    state.nowLoading(`Connecting programs runner`)
    state.wandelApp.startProgramRunner()
  }

  async function tryLoadWandelApp() {
    try {
      await loadWandelApp()
      state.finishLoading()
    } catch (error) {
      state.receiveError(error)
    }
  }

  useEffect(() => {
    tryLoadWandelApp()
  }, [])

  if (state.loading) {
    return <LoadingScreen message={state.loading} error={state.error} />
  }

  return (
    <WandelAppContext.Provider value={state.wandelApp}>
      {props.children}
    </WandelAppContext.Provider>
  )
})
