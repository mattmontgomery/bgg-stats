import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GamesList from "../Components/GamesList";
import GamesControls from "../Components/GamesControls";
import GamesFilters from "../Components/GamesFilters";

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

const dispatchFn = dispatch => ({
  fetch: bindActionCreators(fetch, dispatch),
  filter: bindActionCreators(filter, dispatch),
  sort: bindActionCreators(sort, dispatch)
});

class Collection extends PureComponent {
  componentDidMount() {
    if (this.props.games.length === 0) {
      this.props.fetch();
    }
  }
  render() {
    return (
      <div className="Collection">
        <GamesControls onSort={this.props.sort} />
        <GamesFilters onFilter={this.props.filter} />
        <GamesList games={this.props.games} />
      </div>
    );
  }
}

const ConnectedCollection = connect(
  ({ games, expansions, sort, filter }) => ({
    games: sort(
      [...games, ...expansions].sort().filter(g => !!g.status._own)
    ).filter(filter)
  }),
  dispatchFn
)(Collection);

const ConnectedWishlist = connect(
  ({ games, expansions, sort, filter }) => ({
    games: sort(
      [...games, ...expansions]
        .sort(({ name: nameA }, { name: nameB }) => {
          return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
        })
        .filter(
          ({ status }) =>
            !status._own &&
            (status._want || status._wanttobuy || status._wanttoplay)
        )
        .filter(filter)
    )
  }),
  dispatchFn
)(Collection);

export { ConnectedWishlist as Wishlist };
export { ConnectedCollection as Collection };
