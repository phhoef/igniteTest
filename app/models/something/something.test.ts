import { SomethingModel } from "./something"

test("can be created", () => {
  const instance = SomethingModel.create({})

  expect(instance).toBeTruthy()
})
