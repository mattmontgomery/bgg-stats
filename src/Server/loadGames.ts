import X2JS from "x2js";

import superagent from "superagent";

import { BGG_COLLECTION_URL } from "../Constants/Urls";
import IBGGResponse from "../Interfaces/BGGResponse";
import parseItems from "../utils/parseItems";

export default async function loadGames(username: string) {
  const x2js = new X2JS();
  const url = `${BGG_COLLECTION_URL}&username=${username}`;
  const resp = await superagent.get(url);
  const baseData: IBGGResponse = x2js.xml2js(resp.text);
  return parseItems(baseData.items.item);
}
