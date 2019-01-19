import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameYear extends PureComponent<IGame> {
  public static displayName = "GameYear";
  public render() {
    return <div className="Game__year">{this.props.yearpublished}</div>;
  }
}
