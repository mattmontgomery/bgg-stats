import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { addGame } from "../Reducers/drawer";
import GamesList from "../Components/GamesList";
import GamesControls from "../Components/GamesControls";
import GamesFilters from "../Components/GamesFilters";
import Game, {
  GameInfo,
  GameInfoSection,
  GameTitle,
  GameImage,
  GameYear
} from "../Components/Game";

const fetch = () => ({
  type: "FETCH_COLLECTION",
  payload: { username: "moonty" }
});

const sort = sortFn => ({
  type: "SORT_COLLECTION",
  payload: sortFn
});
const filter = filterFn => ({
  type: "FILTER_COLLECTION",
  payload
});
const toggleFilter = payload => ({
  type: "TOGGLE_FILTER",
  payload
});

const dispatchFn = dispatch => ({
  fetch: bindActionCreators(fetch, dispatch),
  filter: bindActionCreators(filter, dispatch),
  selectGame: bindActionCreators(addGame, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  sort: bindActionCreators(sort, dispatch)
});

class Collection extends PureComponent {
  renderList() {
    return (
      <GamesList>
        {this.props.games.map((game, idx) => (
          <Game
            key={typeof game._collid !== "undefined" ? game._collid : idx}
            index={idx}
            {...game}
          >
            <GameImage />
            <GameTitle>
              <button
                className={classnames("button--small", {
                  "button--remove":
                    this.props.drawer.indexOf(game._objectid) > -1,
                  "button--add":
                    this.props.drawer.indexOf(game._objectid) === -1
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
                render={({
                  value: {
                    rating: { average, bayesaverage }
                  }
                }) =>
                  typeof average === "number" ? average.toFixed(3) : average
                }
              />
              <hr />
              <GameInfo
                field="numplays"
                label="Plays"
                render={({ value }) => value}
              />
              <GameInfo
                field="stats"
                label="Play Time"
                render={({ value: { _minplaytime: min, _maxplaytime: max } }) =>
                  min !== max && max ? `${min}–${max}` : min
                }
              />
              <GameInfo
                field="stats"
                label="Players"
                render={({ value: { _minplayers: min, _maxplayers: max } }) =>
                  min !== max && max ? `${min}–${max}` : min
                }
              />
            </GameInfoSection>
            <GameYear />
          </Game>
        ))}
      </GamesList>
    );
  }
  render() {
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

class Wishlist extends Collection {
  renderList() {
    return (
      <GamesList>
        {this.props.games.map((game, idx) => (
          <Game
            key={typeof game._collid !== "undefined" ? game._collid : idx}
            index={idx}
            {...game}
          >
            <GameImage />
            <GameTitle>
              <button
                className={classnames("button--small", {
                  "button--remove":
                    this.props.drawer.indexOf(game._objectid) > -1,
                  "button--add":
                    this.props.drawer.indexOf(game._objectid) === -1
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
                render={({
                  value: {
                    rating: { average, bayesaverage }
                  }
                }) =>
                  typeof average === "number" ? average.toFixed(3) : average
                }
              />
              <hr />
              <GameInfo
                field="stats"
                label="Play Time"
                render={({ value: { _minplaytime: min, _maxplaytime: max } }) =>
                  min !== max && max ? `${min}–${max}` : min
                }
              />
              <GameInfo
                field="stats"
                label="Players"
                render={({ value: { _minplayers: min, _maxplayers: max } }) =>
                  min !== max && max ? `${min}–${max}` : min
                }
              />
            </GameInfoSection>
            <GameYear />
          </Game>
        ))}
      </GamesList>
    );
  }
}

function sortState(games, expansions, hideExpansions = false) {
  return [...games, ...(hideExpansions ? [] : expansions)].sort(
    ({ name: nameA }, { name: nameB }) => {
      return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    }
  );
}

const ConnectedCollection = connect(
  ({
    games,
    expansions,
    sort,
    filter,
    filters: { hideExpansions },
    drawer
  }) => ({
    games: sort(
      sortState(games, expansions, hideExpansions).filter(g => !!g.status._own)
    ).filter(filter),
    drawer
  }),
  dispatchFn
)(Collection);

const ConnectedShelfOfShame = connect(
  ({
    games,
    expansions,
    sort,
    filter,
    filters: { hideExpansions },
    drawer
  }) => ({
    games: sort(
      sortState(games, expansions, hideExpansions).filter(g => !!g.status._own)
    )
      .filter(filter)
      .filter(({ numplays }) => numplays === 0),
    drawer
  }),
  dispatchFn
)(Collection);

const ConnectedWishlist = connect(
  ({
    games,
    expansions,
    sort,
    filter,
    filters: { hideExpansions },
    drawer
  }) => ({
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
