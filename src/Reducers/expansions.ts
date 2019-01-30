export const EXPANSIONS_FETCH = "expansions/fetch";
export const EXPANSIONS_FETCH_DONE = "expansions/fetch/done";

import { IAction, IGame } from "../Interfaces";
import parseItems from "../utils/parseItems";

export default function expansions(
  state: IGame[] = [],
  { type, payload }: IAction
): IGame[] {
  switch (type) {
    case EXPANSIONS_FETCH_DONE:
      return parseItems(payload.items.item);
    default:
      return state;
  }
}
