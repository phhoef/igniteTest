import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Something } from "../../models/something/something"

export interface User {
  id: number
  name: string
}

export type GetSomethingResult = { kind: "ok"; something: Something[] } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
