import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";

import classnames from "classnames";

import { addGame } from "../Reducers/drawer";
import { changeUsername } from "../Reducers/username";

import Game, {
  GameImage,
  GameInfo,
  GameInfoSection,
  GameTitle,
  GameYear
} from "../Components/Game";
import GamesControls from "../Components/GamesControls";
import GamesFilters from "../Components/GamesFilters";
import GamesList from "../Components/GamesList";

import { IAction, IGame, IGames, IStoreState, IUsername } from "../Interfaces";

export default class Wishlist extends PureComponent<
  RouteComponentProps<IUsername> & IGames
> {
  public renderValue = ({ value }: { value: string | number }) => value;
  public renderRating = ({
    value: {
      rating: { average, bayesaverage }
    }
  }: {
    value: any;
  }) => (typeof average === "number" ? average.toFixed(3) : average);
  public renderPlayTime = ({
    value: { _minplaytime: min, _maxplaytime: max }
  }: {
    value: any;
  }) => (min !== max && max ? `${min}–${max}` : min);
  public renderPlayers = ({
    value: { _minplayers: min, _maxplayers: max }
  }: {
    value: any;
  }) => (min !== max && max ? `${min}–${max}` : min);
  public renderList() {
    return (
      <GamesList>
        {this.props.games.map((game: IGame, idx: number) => (
          <Game
            key={typeof game._collid !== "undefined" ? game._collid : idx}
            index={idx}
            {...game}
          >
            <GameImage />
            <GameTitle>
              <button
                className={classnames("button--small", {
                  "button--add":
                    this.props.drawer.indexOf(game._objectid) === -1,
                  "button--remove":
                    this.props.drawer.indexOf(game._objectid) > -1
                })}
                onClick={this.props.selectGame}
              >
                {this.props.drawer.indexOf(game._objectid) === -1 ? "+" : "X"}
              </button>
            </GameTitle>
            <GameInfoSection>
              <GameInfo
                field="stats"
                label="Rating"
                render={this.renderRating}
              />
              <hr />
              <GameInfo
                field="stats"
                label="Play Time"
                render={this.renderPlayTime}
              />
              <GameInfo
                field="stats"
                label="Players"
                render={this.renderPlayers}
              />
            </GameInfoSection>
            <GameYear />
          </Game>
        ))}
      </GamesList>
    );
  }

  public render() {
    return (
      <div className="Collection">
        <GamesControls onSort={this.props.sort} />
        <GamesFilters
          onFilter={this.props.filter}
          onToggleFilter={this.props.toggleFilter}
        />
        {this.renderList()}
      </div>
    );
  }
}
