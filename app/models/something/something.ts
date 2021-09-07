import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const SomethingModel = types
  .model("Something")
  .props({
    id: types.identifier,
    name: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SomethingType = Instance<typeof SomethingModel>
export interface Something extends SomethingType {}
type SomethingSnapshotType = SnapshotOut<typeof SomethingModel>
export interface SomethingSnapshot extends SomethingSnapshotType {}
export const createSomethingDefaultModel = () => types.optional(SomethingModel, {})
