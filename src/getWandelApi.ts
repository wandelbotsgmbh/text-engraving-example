import { WandelAPIWrapper } from "@wandelbots/wandelbots-api-wrapper"
import { env } from "./runtimeEnv"
import type { AxiosRequestConfig } from "axios"

let wandelApi: WandelAPIWrapper | null = null

export const getWandelApi = () => {
  if (!wandelApi) {
    wandelApi = new WandelAPIWrapper({
      basePath: `${env.WANDELAPI_BASE_URL}/api/v1`,
      // Don't know why this is in the type
      isJsonMime: undefined as any,
      username: env.NOVA_USERNAME,
      password: env.NOVA_PASSWORD,
      baseOptions: {
        timeout: 60000,
        ...(env.NOVA_USERNAME && env.NOVA_PASSWORD
          ? ({
              headers: {
                Authorization:
                  "Basic " +
                  Buffer.from(
                    env.NOVA_USERNAME + ":" + env.NOVA_PASSWORD,
                  ).toString("base64"),
              },
            } satisfies AxiosRequestConfig)
          : {}),
      },
    })
  }

  return wandelApi
}
