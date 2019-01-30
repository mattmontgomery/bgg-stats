// tslint:disable:no-submodule-imports
import { all, takeLatest } from "redux-saga/effects";
import { COLLECTION_FETCH } from "../Reducers/games";
import { USERNAME_SET } from "../Reducers/username";
import fetchCollection from "./fetchCollection";
import switchUsername from "./switchUsername";

export default function* rootSaga() {
  yield takeLatest(COLLECTION_FETCH, fetchCollection);
  yield takeLatest(USERNAME_SET, switchUsername);
}
