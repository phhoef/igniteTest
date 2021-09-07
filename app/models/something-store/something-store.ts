import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { GetSomethingResult } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"
import { Something, SomethingModel, SomethingSnapshot } from "../something/something"

/**
 * Model description here for TypeScript hints.
 */
export const SomethingStoreModel = types
  .model("SomethingStore")
  .props({
    somethings: types.optional(types.array(SomethingModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveSomething: (somethingSnapshots: SomethingSnapshot[]) => {
      console.tron.log("saveSomething")
      console.tron.log(somethingSnapshots)
      try {
        const somethingModel: Something[] = somethingSnapshots.map((t) => SomethingModel.create(t))
        console.tron.log("models created")
        console.tron.log(somethingModel)
        self.somethings.replace(somethingModel)
      } catch (e) {
        console.tron.logImportant(e)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    loadSomething: flow(function* () {
      const result: GetSomethingResult = yield self.environment.api.fetchSomething()
      console.tron.log(result)

      if (result.kind === "ok") {
        console.tron.log("OK")
        self.saveSomething(result.something)
      } else __DEV__ && console.tron.log(result.kind)
    }),
  }))

type SomethingStoreType = Instance<typeof SomethingStoreModel>
export interface SomethingStore extends SomethingStoreType {}
type SomethingStoreSnapshotType = SnapshotOut<typeof SomethingStoreModel>
export interface SomethingStoreSnapshot extends SomethingStoreSnapshotType {}
export const createSomethingStoreDefaultModel = () => types.optional(SomethingStoreModel, {})
