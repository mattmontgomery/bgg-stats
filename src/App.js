import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GamesList from "./GamesList";
import GamesControls from "./GamesControls";
import "./App.scss";

const fetch = () => ({
  type: "FETCH_COLLECTION",
  payload: { username: "moonty" }
});

const sort = sortFn => ({
  type: "SORT_COLLECTION",
  payload: sortFn
});

class App extends Component {
  componentDidMount() {
    if (this.props.games.length === 0) {
      this.props.fetch();
    }
  }
  render() {
    return (
      <div className="App">
        <GamesControls onSort={this.props.sort} />
        <GamesList games={this.props.games} />
      </div>
    );
  }
}

export default connect(
  ({ games, sort }) => ({
    games: sort(games.filter(g => !!g.status._own))
  }),
  dispatch => ({
    fetch: bindActionCreators(fetch, dispatch),
    sort: bindActionCreators(sort, dispatch)
  })
)(App);
