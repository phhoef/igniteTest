import { SomethingStoreModel } from "./something-store"

test("can be created", () => {
  const instance = SomethingStoreModel.create({})

  expect(instance).toBeTruthy()
})
