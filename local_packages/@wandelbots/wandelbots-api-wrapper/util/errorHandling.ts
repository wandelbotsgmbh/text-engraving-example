import { isError } from "lodash-es"
import { AxiosError } from "axios"

/**
 * Converts an `unknown` value that was thrown into an `Error` object.
 *
 * @param value - An `unknown` value.
 *
 * @returns An `Error` object.
 */
export const toNormalizedError = <E>(value: E): Error => {
  if (isError(value)) {
    return value
  } else {
    try {
      return new Error(
        `Unexpected value thrown: ${
          typeof value === "object" ? JSON.stringify(value) : String(value)
        }`,
      )
    } catch {
      return new Error(`Unexpected value thrown: non-stringifiable object`)
    }
  }
}

export function makeShortErrorMessage(err: unknown) {
  if (err instanceof AxiosError && err.response) {
    return `${err.response?.status} ${err.response?.statusText}: ${JSON.stringify(err.response?.data)}`
  } else if (err instanceof Error) {
    return err.message
  } else {
    return `Unexpected error: ${err}`
  }
}

export function makeErrorMessage(err: unknown) {
  if (err instanceof AxiosError && err.response) {
    return `${err.response?.status} ${err.response?.statusText} from ${err.response?.config.url}: ${JSON.stringify(err.response?.data)}`
  } else if (err instanceof Error) {
    return err.message
  } else {
    return `Unexpected error: ${err}`
  }
}
