import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { SomethingSnapshot } from "../../models/something/something"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of trucks.
   */
  async fetchSomething(): Promise<Types.GetSomethingResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      `/infinitered/ignite/master/data/rick-and-morty.json`,
      { amount: 10 },
    )

    console.tron.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertSomething = (raw) => {
      return {
        id: raw.id.toString(),
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawSomething = response.data.results
      const resultSomething: SomethingSnapshot[] = rawSomething.map(convertSomething)

      console.tron.log(["API", resultSomething])

      return { kind: "ok", something: resultSomething }
    } catch {
      console.tron.log("test")
      return { kind: "bad-data" }
    }
  }
}
