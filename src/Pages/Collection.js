import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GamesList from "../Components/GamesList";
import GamesControls from "../Components/GamesControls";
import GamesFilters from "../Components/GamesFilters";
import Game, {
  GameInfo,
  GameInfoSection,
  GameTitle,
  GameImage
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
  payload: filterFn
});
const toggleFilter = payload => ({
  type: "TOGGLE_FILTER",
  payload: payload
});

const dispatchFn = dispatch => ({
  fetch: bindActionCreators(fetch, dispatch),
  filter: bindActionCreators(filter, dispatch),
  toggleFilter: bindActionCreators(toggleFilter, dispatch),
  sort: bindActionCreators(sort, dispatch)
});

class Collection extends PureComponent {
  componentDidMount() {
    if (this.props.games.length === 0) {
      this.props.fetch();
    }
  }
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
            <GameTitle />
            <GameInfoSection>
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
            <GameTitle />
            <GameInfoSection>
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
  ({ games, expansions, sort, filter, filters: { hideExpansions } }) => ({
    games: sort(
      sortState(games, expansions, hideExpansions).filter(g => !!g.status._own)
    ).filter(filter)
  }),
  dispatchFn
)(Collection);

const ConnectedWishlist = connect(
  ({ games, expansions, sort, filter, filters: { hideExpansions } }) => ({
    games: sort(
      sortState(games, expansions, hideExpansions)
        .filter(
          ({ status }) =>
            !status._own &&
            (status._want || status._wanttobuy || status._wanttoplay)
        )
        .filter(filter)
    )
  }),
  dispatchFn
)(Wishlist);

export { ConnectedWishlist as Wishlist };
export { ConnectedCollection as Collection };
