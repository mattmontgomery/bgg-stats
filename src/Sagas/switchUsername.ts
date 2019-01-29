// tslint:disable:no-submodule-imports
import { put, select } from "redux-saga/effects";
import { IAction, IStoreState } from "../Interfaces";
import { COLLECTION_FETCH } from "../Reducers/collection";
import { DRAWER_CLEAR } from "../Reducers/drawer";

export default function* switchUsername() {
  try {
    const username = yield select((state: IStoreState) => state.username);
    yield put({ type: COLLECTION_FETCH, payload: username });
    yield put({ type: DRAWER_CLEAR, payload: username });
  } catch (e) {
    // tslint:disable:no-console
    console.error(e);
    // tslint:enable:no-console
  }
}
