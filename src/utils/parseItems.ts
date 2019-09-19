import { IGame } from "../Interfaces";
export interface IRawGame {
  _objectid: number;
  id: number;
  name: {
    __text: string;
  };
  thumbnail: string;
  yearpublished: number;
  numplays: string;
  stats: IRawGameStats;
  status: IRawGameStatus;
}

export interface IRawGameStats {
  _minplayers: string;
  _maxplayers: string;
  _minplaytime: string;
  _maxplaytime: string;
  rating: IRawGameRating;
}
export interface IRawGameStatus {
  [key: string]: string;
  _own: string;
  _wanttobuy: string;
  _wanttoown: string;
}

export interface IRawGameRating {
  average: IValue;
  bayesaverage: IValue;
  stddev: IValue;
}

export interface IValue {
  _value: string;
}

function gameReducer(acc: {}, item: [string, string]): {} {
  const value = typeof item[1] === "string" ? parseInt(item[1], 10) : item[1];
  return {
    ...acc,
    [item[0]]: value
  };
}

function ratingsReducer(acc: { [index: string]: IValue }, key: string): {} {
  const value =
    typeof acc[key]._value === "string"
      ? parseFloat(acc[key]._value)
      : acc[key];
  return {
    ...acc,
    [key]: value
  };
}

function statusReducer(
  acc: { [index: string]: string },
  item: [string, string]
): IGame.Status {
  const value = item[1] === "1";
  return {
    ...acc,
    _own: acc._own,
    _wanttobuy: acc._wanttobuy,
    _wanttoown: acc._wanttoown,
    [item[0]]: value
  };
}

export default function parseItems(items: IRawGame[] = []): IGame[] {
  return items.map(item => ({
    ...item,
    name: item.name.__text,
    numplays: parseInt(item.numplays, 10),
    stats: {
      ...item.stats,
      ...Object.entries(item.stats).reduce(gameReducer, {}),
      rating: {
        ...Object.keys(item.stats.rating).reduce(
          ratingsReducer,
          item.stats.rating
        )
      }
    },
    status: Object.entries(item.status).reduce(statusReducer, {})
  }));
}
