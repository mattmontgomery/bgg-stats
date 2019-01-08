import { combineReducers } from "redux";
import parseItems from "../utils/parseItems";

function defaultSort({ name: nameA, name: nameB }) {
  return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
}
function raw(state = {}, { type, payload }) {
  switch (type) {
    case "FETCH_COLLECTION_DONE":
      return { base: payload };
    case "FETCH_EXPANSIONS_DONE":
      return { exp: payload };
    default:
      return state;
  }
}

function games(state = [], { type, payload }) {
  switch (type) {
    case "FETCH_COLLECTION_DONE":
      return parseItems(payload.items.item);
    case "FETCH_COLLECTION_LS":
      return payload;
    default:
      return state;
  }
}
function expansions(state = [], { type, payload }) {
  switch (type) {
    case "FETCH_EXPANSIONS_DONE":
      return parseItems(payload.items.item);
    case "FETCH_EXPANSIONS_LS":
      return payload;
    default:
      return state;
  }
}

function sort(state = items => items.sort(defaultSort), { type, payload }) {
  switch (type) {
    case "SORT_COLLECTION":
      return payload;
    default:
      return state;
  }
}
function filter(state = items => items, { type, payload }) {
  switch (type) {
    case "FILTER_COLLECTION":
      return payload;
    default:
      return state;
  }
}
function filters(state = [], { type, payload }) {
  switch (type) {
    case "FILTER_ADD":
      return payload;
    case "FILTER_RESET":
      return [];
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
