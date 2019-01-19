import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameTitle extends PureComponent<IGame> {
  public static displayName = "GameTitle";
  public render() {
    return (
      <h3 className="Game__title">
        <a
          href={`http://boardgamegeek.com/boardgame/${this.props.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {this.props.name}
        </a>
      </h3>
    );
  }
}
