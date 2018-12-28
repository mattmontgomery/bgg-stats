import { takeLatest } from "redux-saga/effects";
import fetchCollection from "./fetchCollection";

export default function* rootSaga() {
  yield takeLatest("FETCH_COLLECTION", fetchCollection);
}
