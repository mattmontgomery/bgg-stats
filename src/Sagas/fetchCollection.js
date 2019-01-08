import { put, call } from "redux-saga/effects";
import X2JS from "x2js";

const BGG_COLLECTION_URL =
  "https://www.boardgamegeek.com/xmlapi2/collection?stats=1&version=1&excludesubtype=boardgameexpansion";
const BGG_COLLECTION_JUST_EXPANSIONS_URL =
  "https://www.boardgamegeek.com/xmlapi2/collection?stats=1&version=1&subtype=boardgameexpansion";

export default function* fetchCollection({ type, payload: { username } }) {
  try {
    const x2js = new X2JS();
    const req = new Request(
      `${BGG_COLLECTION_URL}&username=${username ? username : "moonty"}`
    );
    const resp = yield call(fetch, req);
    if (!resp.ok) {
      throw resp.statusText;
    }
    const xml = yield resp.text();

    const data = x2js.xml2js(xml);
    yield put({ type: "FETCH_COLLECTION_DONE", payload: data });
    const expReq = new Request(
      `${BGG_COLLECTION_JUST_EXPANSIONS_URL}&username=${
        username ? username : "moonty"
      }`
    );
    const expResp = yield call(fetch, expReq);
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
