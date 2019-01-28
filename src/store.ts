/* eslint-env browser */

import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Dispatch,
  Middleware,
  MiddlewareAPI
} from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
// tslint:disable:no-submodule-imports
import storage from "redux-persist/lib/storage";
// tslint:enable:no-submodule-imports
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Reducers/index";
import parseItems from "./utils/parseItems";

import sagas from "./Sagas/index";

const sagaMiddleware = createSagaMiddleware();
const LOCAL_STORAGE_GAMES_KEY = "games";
const LOCAL_STORAGE_EXPANSIONS_KEY = "expansions";

const persistConfig = {
  key: "root",
  storage
};

declare global {
  // tslint:disable-next-line
  interface Window {
    Store: any;
  }
}

interface IResult {
  payload: {
    items: {
      item: [];
    };
  };
}

const logger = createLogger({});

export default () => {
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, logger)(
    createStore
  );
  const store = createStoreWithMiddleware(
    persistReducer(persistConfig, rootReducer)
  );
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);

  window.Store = store;
  return { store, persistor };
};
