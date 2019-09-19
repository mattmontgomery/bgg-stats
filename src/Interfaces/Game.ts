import IGameStatus from "./GameStatus";

export default interface IGame {
  _objectid: number;
  id: number;
  name: string;
  thumbnail: string;
  yearpublished: number;
  numplays: number;
  stats: {
    _minplayers: number;
    _maxplayers: number;
    _minplaytime: number;
    _maxplaytime: number;
    rating: {
      average: number;
      bayesaverage: number;
      stddev: number;
    };
  };
  status: IGameStatus;
}
