import React, { PureComponent } from "react";
import { IGameInfoProps } from "../Interfaces";

export default class GameInfo extends PureComponent<IGameInfoProps> {
  public static displayName = "GameInfo";
  public render() {
    return (
      <div className="Game__info-detail">
        <strong>
          {this.props.label}
          {": "}
        </strong>
        <span>{this.props.render(this.props)}</span>
      </div>
    );
  }
}
