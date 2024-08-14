import { NovaClient } from "@wandelbots/wandelbots-js"
import { env } from "./runtimeEnv"
import type { AxiosRequestConfig } from "axios"

let nova: NovaClient | null = null

export const getNovaClient = () => {
  if (!nova) {
    nova = new NovaClient({
      cellId:  env.CELL_ID ?? "cell",
      instanceUrl: `${env.WANDELAPI_BASE_URL}`,
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

  return nova
}
