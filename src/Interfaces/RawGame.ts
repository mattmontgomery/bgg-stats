export default interface IRawGame {
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
