import React, { PureComponent } from "react";
export default class Game extends PureComponent {
  render() {
    return (
      <div className="Game">
        <div className="Game__index">{this.props.index}</div>
        <div className="Game__background">
          {this.props.thumbnail ? (
            <img
              className="Game__thumbnail"
              src={this.props.thumbnail}
              alt={this.props.name}
            />
          ) : null}
        </div>
        <div className="Game__info">
          <h3>{this.props.name}</h3>
          <div>
            <strong>{"Plays: "}</strong> {this.props.numplays}
          </div>
        </div>
        <div className="Game__year">{this.props.yearpublished}</div>
      </div>
    );
  }
}
