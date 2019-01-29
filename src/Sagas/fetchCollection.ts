// tslint:disable:no-submodule-imports
// tslint:disable:no-console

import { call, delay, put, retry, select } from "redux-saga/effects";
import X2JS from "x2js";
import { IStoreState } from "../Interfaces";

import { COLLECTION_FETCH_DONE } from "../Reducers/collection";

const MAX_RETRIES: number = 5;
const RETRY_TIMEOUT: number = 5000;

const BGG_COLLECTION_URL: string =
  "https://www.boardgamegeek.com/xmlapi2/collection?stats=1&version=1&excludesubtype=boardgameexpansion";
const BGG_COLLECTION_JUST_EXPANSIONS_URL: string =
  "https://www.boardgamegeek.com/xmlapi2/collection?stats=1&version=1&subtype=boardgameexpansion";

export default function* fetchCollection() {
  try {
    const username = yield select((state: IStoreState) => state.username);
    const x2js = new X2JS();
    const req = new Request(`${BGG_COLLECTION_URL}&username=${username}`);
    const resp = yield retry(MAX_RETRIES, RETRY_TIMEOUT, makeRequest, req);
    if (!resp.ok) {
      throw resp.statusText;
    }
    const xml = yield resp.text();

    const data = x2js.xml2js(xml);
    yield put({ type: COLLECTION_FETCH_DONE, payload: data });
    const expReq = new Request(
      `${BGG_COLLECTION_JUST_EXPANSIONS_URL}&username=${
        username ? username : "moonty"
      }`
    );
    const expResp = yield retry(
      MAX_RETRIES,
      RETRY_TIMEOUT,
      makeRequest,
      expReq
    );
    if (!expResp.ok) {
      throw expResp.statusText;
    }
    const expXml = yield expResp.text();

    const expData = x2js.xml2js(expXml);
    yield put({ type: "FETCH_EXPANSIONS_DONE", payload: expData });
  } catch (e) {
    console.error(e);
  }
}

function* makeRequest(req: Request) {
  const resp = yield call(fetch, req);
  if (resp.status === 200) {
    return resp;
  } else {
    throw new Error("Retrying request");
  }
}
