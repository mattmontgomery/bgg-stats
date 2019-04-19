import React, { PureComponent, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IAction, IGame, IStoreState, IToggleable } from "../Interfaces";
import { removeGame } from "../Reducers/drawer";
import Game, { GameImage, GameTitle } from "./Game";
import GamesList from "./GamesList";
import WithToggle from "./WithToggle";

export interface IGameDrawerProps {
  games: IGame[];
  removeGame?: () => void;
}

export class GameDrawer extends PureComponent<IGameDrawerProps & IToggleable> {
  public toggle = () => this.props.toggle(!this.props.open);
  public render() {
    return (
      <div
        className={`GameDrawer ${
          this.props.open ? "GameDrawer--open" : "GameDrawer--closed"
        }`}
      >
        <button className="GameDrawer__toggle" onClick={this.toggle}>
          {this.props.open ? "Close" : "Open"}
        </button>
        <GamesList>
          {this.props.games.map((game: IGame, idx: number) => {
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

export default WithToggle(
  connect(
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
  )(GameDrawer)
);
