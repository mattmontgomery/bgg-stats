import React, { PureComponent } from "react";
import Game from "./Game";

export default class GamesList extends PureComponent {
  render() {
    return (
      <div className="Games">
        {this.props.games.map((game, idx) => (
          <Game
            key={typeof game._collid !== "undefined" ? game._collid : idx}
            index={idx}
            {...game}
          />
        ))}
      </div>
    );
  }
}
