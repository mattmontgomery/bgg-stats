export const COLLECTION_FETCH = "games/fetch";
export const COLLECTION_FETCH_DONE = "games/fetch/done";

import { IAction, IGame } from "../Interfaces";
import parseItems from "../utils/parseItems";

export default function games(
  state: IGame[] = [],
  { type, payload }: IAction
): IGame[] {
  switch (type) {
    case COLLECTION_FETCH_DONE:
      return parseItems(payload.items.item);
    default:
      return state;
  }
}
