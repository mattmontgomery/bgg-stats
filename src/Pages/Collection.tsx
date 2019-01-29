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
import Wishlist from "./Wishlist";

import { IAction, IGame, IGames, IStoreState, IUsername } from "../Interfaces";

const sort = (sortFn: () => void) => ({
  payload: sortFn,
  type: "SORT_COLLECTION"
});
const filter = (filterFn: () => void) => ({
  payload: filterFn,
  type: "FILTER_COLLECTION"
});
const toggleFilter = (payload: boolean) => ({
  payload,
  type: "TOGGLE_FILTER"
});

const dispatchFn = (dispatch: Dispatch<IAction>) => ({
  changeUsername: bindActionCreators(changeUsername, dispatch),
  filter: bindActionCreators(filter, dispatch),
  selectGame: bindActionCreators(addGame, dispatch),
  sort: bindActionCreators(sort, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch)
});

interface IDispatchProps {
  changeUsername: (name: string) => void;
  filter: (filterFn: () => void) => void;
  selectGame: () => void;
  sort: () => void;
  toggleFilter: () => void;
}

class Collection extends PureComponent<
  RouteComponentProps<IUsername> & IDispatchProps & IGames
> {
  public componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.username &&
      this.props.match.params.username !== this.props.username
    ) {
      this.props.changeUsername(this.props.match.params.username);
    }
  }
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
                field="numplays"
                label="Plays"
                render={this.renderValue}
              />
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

function sortState(
  games: IGames,
  expansions: IGames,
  hideExpansions: boolean = false
) {
  return [...games, ...(hideExpansions ? [] : expansions)].sort(
    ({ name: nameA }, { name: nameB }) => {
      return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    }
  );
}

const ConnectedCollection = connect(
  ({
    drawer,
    expansions,
    filter,
    filters: { hideExpansions },
    games,
    sort,
    username
  }: IStoreState) => ({
    username,
    games: sort(
      sortState(games, expansions, hideExpansions).filter(g => !!g.status._own)
    ).filter(filter),
    drawer
  }),
  dispatchFn
)(Collection);

const ConnectedShelfOfShame = connect(
  ({
    drawer,
    games,
    expansions,
    filter,
    filters: { hideExpansions },
    sort,
    username
  }: IStoreState) => ({
    drawer,
    games: sort(
      sortState(games, expansions, hideExpansions).filter(g => !!g.status._own)
    )
      .filter(filter)
      .filter(({ numplays }: IGame) => numplays === 0),
    username
  }),
  dispatchFn
)(Collection);

const ConnectedWishlist = connect(
  ({
    drawer,
    expansions,
    filter,
    filters: { hideExpansions },
    games,
    sort
  }: IStoreState) => ({
    drawer,
    games: sort(
      sortState(games, expansions, hideExpansions)
        .filter(
          ({ status }) =>
            !status._own &&
            (status._want || status._wanttobuy || status._wanttoplay)
        )
        .filter(filter),
      drawer
    )
  }),
  dispatchFn
)(Wishlist);

export { ConnectedWishlist as Wishlist };
export { ConnectedCollection as Collection };
export { ConnectedShelfOfShame as ShelfOfShame };
