import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import parseItems from "./utils/parseItems";
import rootReducer from "./Reducers/index";
import sagas from "./Sagas/index";

const sagaMiddleware = createSagaMiddleware();
const LOCAL_STORAGE_GAMES_KEY = "games";

let gamesFromLocalStorage = [];

function localStorageMiddleware(store) {
  return next => action => {
    // console.log(action);
    const result = next(action);
    if (action.type === "FETCH_COLLECTION_DONE") {
      localStorage.setItem(
        LOCAL_STORAGE_GAMES_KEY,
        JSON.stringify(parseItems(result.payload.items.item))
      );
    }
    return result;
  };
}

const store = createStore(
  rootReducer,
  {
    games: gamesFromLocalStorage
  },
  applyMiddleware(localStorageMiddleware, sagaMiddleware)
);
if (window && window.localStorage) {
  gamesFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_GAMES_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_GAMES_KEY))
    : [];
  store.dispatch({
    type: "FETCH_COLLECTION_LS",
    payload: gamesFromLocalStorage
  });
}

sagaMiddleware.run(sagas);

window.store = store;

export default store;
