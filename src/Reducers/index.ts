import { combineReducers } from "redux";
import { IAction } from "../Interfaces";
import { COLLECTION_FETCH_DONE } from "../Reducers/games";
import drawer from "./drawer";
import expansions from "./expansions";
import games from "./games";
import username from "./username";

function defaultSort(a: { name: string }, b: { name: string }): number {
  return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
}

export interface IRawState {
  base?: {};
  exp?: {};
}

export interface IGame {
  _objectid: number;
  name: string;
}

function raw(state: IRawState = {}, { type, payload }: IAction): IRawState {
  switch (type) {
    case COLLECTION_FETCH_DONE:
      return { base: payload };
    case "FETCH_EXPANSIONS_DONE":
      return { exp: payload };
    default:
      return state;
  }
}

function sort(
  state: (items: Array<{ name: string }>) => Array<{ name: string }> = items =>
    items.sort(defaultSort),
  { type, payload }: IAction
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
  { type, payload }: IAction
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
  { type, payload }: IAction
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
  drawer,
  expansions,
  filter,
  filters,
  games,
  raw,
  sort,
  username
});
