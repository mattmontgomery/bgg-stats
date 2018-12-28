import { combineReducers } from "redux";
import parseItems from "../utils/parseItems";
function raw(state = {}, { type, payload }) {
  switch (type) {
    case "FETCH_COLLECTION_DONE":
      return payload;
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

function sort(state = items => items, { type, payload }) {
  switch (type) {
    case "SORT_COLLECTION":
      return payload;
    default:
      return state;
  }
}

export default combineReducers({ games, raw, sort });
