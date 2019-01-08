import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import parseItems from "./utils/parseItems";
import rootReducer from "./Reducers/index";
import sagas from "./Sagas/index";

const sagaMiddleware = createSagaMiddleware();
const LOCAL_STORAGE_GAMES_KEY = "games";
const LOCAL_STORAGE_EXPANSIONS_KEY = "expansions";

function localStorageMiddleware(store) {
  return next => action => {
    // console.log(action);
    const result = next(action);
    switch (action.type) {
      case "FETCH_COLLECTION_DONE":
        localStorage.setItem(
          LOCAL_STORAGE_GAMES_KEY,
          JSON.stringify(parseItems(result.payload.items.item))
        );
        return result;
      case "FETCH_EXPANSIONS_DONE":
        localStorage.setItem(
          LOCAL_STORAGE_EXPANSIONS_KEY,
          JSON.stringify(parseItems(result.payload.items.item))
        );
        return result;
      default:
        return result;
    }
  };
}

const store = createStore(
  rootReducer,
  applyMiddleware(localStorageMiddleware, sagaMiddleware)
);
if (window && window.localStorage) {
  const gamesFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_GAMES_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_GAMES_KEY))
    : [];
  store.dispatch({
    type: "FETCH_COLLECTION_LS",
    payload: gamesFromLocalStorage
  });
  const expansionsFromLocalStorage = localStorage.getItem(
    LOCAL_STORAGE_EXPANSIONS_KEY
  )
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_EXPANSIONS_KEY))
    : [];
  store.dispatch({
    type: "FETCH_EXPANSIONS_LS",
    payload: expansionsFromLocalStorage
  });
}

sagaMiddleware.run(sagas);

window.store = store;

export default store;
