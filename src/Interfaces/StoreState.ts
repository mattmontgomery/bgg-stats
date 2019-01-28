import IGame from "./Game";

export default interface IStoreState {
  games: [IGame];
  drawer?: [string];
}
