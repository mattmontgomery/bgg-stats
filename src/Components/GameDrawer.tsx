import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IAction, IGame, IStoreState, IToggleable } from "../Interfaces";
import { removeGame } from "../Reducers/drawer";
import Game, { GameImage, GameTitle } from "./Game";
import GamesList from "./GamesList";

export interface IGameDrawerProps {
  games: IGame[];
  removeGame?: () => void;
}

export class GameDrawer extends PureComponent<IGameDrawerProps, IToggleable> {
  public state: IToggleable = {
    open: false
  };
  public toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  };
  public render() {
    return (
      <div
        className={`GameDrawer ${
          this.state.open ? "GameDrawer--open" : "GameDrawer--closed"
        }`}
      >
        <button className="GameDrawer__toggle" onClick={this.toggleDrawer}>
          {this.state.open ? "Close" : "Open"}
        </button>
        <GamesList>
          {this.props.games.map((game, idx) => {
            return (
              <Game key={game._collid || idx} {...game}>
                <GameTitle>
                  <button
                    className="button--small button--remove"
                    onClick={this.props.removeGame}
                  >
                    X
                  </button>
                </GameTitle>
                <GameImage />
              </Game>
            );
          })}
        </GamesList>
      </div>
    );
  }
}

export default connect(
  ({ drawer, games }: IStoreState) => ({
    games: drawer
      .map((id: string) =>
        games.find(({ _objectid: gameId }: IGame) => id === gameId)
      )
      .filter(Boolean)
  }),
  (dispatch: Dispatch<IAction>) => ({
    removeGame: bindActionCreators(removeGame, dispatch)
  })
)(GameDrawer);
