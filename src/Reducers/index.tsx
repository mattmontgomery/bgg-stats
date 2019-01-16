import { combineReducers } from "redux";
import parseItems from "../utils/parseItems";

function defaultSort(a: { name: string }, b: { name: string }): number {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
}

export interface Action {
  type: string;
  payload: any;
}

export interface RawState {
  base?: {};
  exp?: {};
}

export interface Game {
  _objectid: Number;
  name: string;
}

function raw(state: RawState = {}, { type, payload }: Action): RawState {
  switch (type) {
    case "FETCH_COLLECTION_DONE":
      return { base: payload };
    case "FETCH_EXPANSIONS_DONE":
      return { exp: payload };
    default:
      return state;
  }
}

function games(
  state: Array<Game> = [],
  { type, payload }: Action
): Array<Game> {
  switch (type) {
    case "FETCH_COLLECTION_DONE":
      return parseItems(payload.items.item);
    case "FETCH_COLLECTION_LS":
      return payload;
    default:
      return state;
  }
}
function expansions(
  state: Array<Game> = [],
  { type, payload }: Action
): Array<Game> {
  switch (type) {
    case "FETCH_EXPANSIONS_DONE":
      return parseItems(payload.items.item);
    case "FETCH_EXPANSIONS_LS":
      return payload;
    default:
      return state;
  }
}

function sort(
  state: (items: Array<{ name: string }>) => Array<{ name: string }> = items =>
    items.sort(defaultSort),
  { type, payload }: Action
) {
  switch (type) {
    case "SORT_COLLECTION":
      return payload;
    default:
      return state;
  }
}
function filter(
  state: (items: Array<{}>) => Array<{}> = items => items,
  { type, payload }: Action
) {
  switch (type) {
    case "FILTER_COLLECTION":
      return payload;
    default:
      return state;
  }
}
function filters(
  state = {
    hideExpansions: true
  },
  { type, payload }: Action
) {
  switch (type) {
    case "TOGGLE_FILTER":
      return { ...state, ...payload };
    case "FILTER_RESET":
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  games,
  expansions,
  raw,
  sort,
  filter,
  filters
});
