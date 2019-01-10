import React, { PureComponent } from "react";

export default class GamesList extends PureComponent {
  render() {
    return <div className="Games">{this.props.children}</div>;
  }
}
