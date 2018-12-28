import { put, call } from "redux-saga/effects";
import X2JS from "x2js";

const BGG_COLLECTION_URL = "https://www.boardgamegeek.com/xmlapi2/collection";

export default function* fetchCollection({ type, payload: { username } }) {
  try {
    const x2js = new X2JS();
    const req = new Request(
      `${BGG_COLLECTION_URL}?username=${username ? username : "moonty"}`
    );
    const resp = yield call(fetch, req);
    if (!resp.ok) {
      throw resp.statusText;
    }
    const xml = yield resp.text();

    const data = x2js.xml2js(xml);
    yield put({ type: "FETCH_COLLECTION_DONE", payload: data });
  } catch (e) {
    console.error(e);
  }
}
