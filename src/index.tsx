import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// tslint:disable
import { PersistGate } from "redux-persist/integration/react";
// tslint:enable

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import createStore from "./store";

const { store, persistor } = createStore();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
