import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameImage extends PureComponent<IGame> {
  public static displayName = "GameImage";
  public render() {
    return (
      <div className="Game__background">
        {this.props.thumbnail ? (
          <img
            className="Game__thumbnail"
            src={this.props.thumbnail}
            alt={this.props.name}
          />
        ) : null}
      </div>
    );
  }
}
