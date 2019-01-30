import { IAction } from "../Interfaces";

export const USERNAME_SET = "username/set";

export const changeUsername = (payload: string) => ({
  payload,
  type: USERNAME_SET
});

export default function username(
  state: string = "",
  { type, payload }: IAction
) {
  switch (type) {
    case USERNAME_SET:
      return payload;
    default:
      return state;
  }
}
