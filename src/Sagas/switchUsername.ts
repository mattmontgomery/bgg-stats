// tslint:disable:no-submodule-imports
import { put, select } from "redux-saga/effects";
import { IAction, IStoreState } from "../Interfaces";
import { DRAWER_CLEAR } from "../Reducers/drawer";
import { COLLECTION_FETCH } from "../Reducers/games";

import { generatePath } from "react-router";

export default function* switchUsername() {
  try {
    const username = yield select((state: IStoreState) => state.username);
    yield put({ type: COLLECTION_FETCH, payload: username });
    yield put({ type: DRAWER_CLEAR, payload: username });
    const newPath = generatePath(`/user/:username/collection`, { username });
  } catch (e) {
    // tslint:disable:no-console
    console.error(e);
    // tslint:enable:no-console
  }
}
