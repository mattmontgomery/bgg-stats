// tslint:disable:no-submodule-imports
// tslint:disable:no-console

import { call, put, select } from "redux-saga/effects";
import { IStoreState } from "../Interfaces";

import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";

import gql from "graphql-tag";

import { EXPANSIONS_FETCH_DONE } from "../Reducers/expansions";
import { COLLECTION_FETCH_PARSED_DONE } from "../Reducers/games";

import types from "../schema/types.js";

const MAX_RETRIES: number = 5;
const RETRY_TIMEOUT: number = 5000;

export default function* fetchGraphQL() {
  try {
    const username = yield select((state: IStoreState) => state.username);
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({ uri: "http://localhost:4000/graphql" })
    });
    const games = yield call(makeQuery, client, username);
    yield put({ type: COLLECTION_FETCH_PARSED_DONE, payload: games });

    // console.log(client);
    // const resp = yield retry(MAX_RETRIES, RETRY_TIMEOUT, makeRequest, req);
    // if (!resp.ok) {
    //   throw resp.statusText;
    // }
    // const data = yield resp.text();

    // const expReq = new Request(
    //   `${BGG_COLLECTION_JUST_EXPANSIONS_URL}&username=${
    //     username ? username : "moonty"
    //   }`
    // );
    // const expResp = yield retry(
    //   MAX_RETRIES,
    //   RETRY_TIMEOUT,
    //   makeRequest,
    //   expReq
    // );
    // if (!expResp.ok) {
    //   throw expResp.statusText;
    // }
    // const expXml = yield expResp.text();

    // const expData = x2js.xml2js(expXml);
    // yield put({ type: EXPANSIONS_FETCH_DONE, payload: expData });
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

async function makeQuery(client: ApolloClient<any>, username: string) {
  const data = await client.query({
    query: gql`
    query Games {
      games(username:"${username}") {
        _objectid
        id
        name
        thumbnail
        yearpublished
        numplays
        stats {
          _minplayers
          _maxplayers
          _minplaytime
          _maxplaytime
          rating {
            average
            bayesaverage
            stddev
          }
        }
        status {
          _own
          _wanttoplay
          _wanttobuy
        }
      }
    }
  `
  });
  return data.data.games;
}
