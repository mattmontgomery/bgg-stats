import React, { PureComponent } from "react";
export default class Game extends PureComponent {
  render() {
    // console.log(this.props);
    return (
      <div className={"Game"}>
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
          <h3>
            <a
              href={`http://boardgamegeek.com/boardgame/${
                this.props._objectid
              }`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {this.props.name}
            </a>
          </h3>
          <div>
            <strong>{"Plays: "}</strong> {this.props.numplays}
          </div>
          <div>
            <strong>{"Time: "}</strong>
            {this.props.stats._minplaytime !== this.props.stats._maxplaytime &&
            this.props.stats._maxplaytime
              ? `${this.props.stats._minplaytime}
              –
              ${this.props.stats._maxplaytime}`
              : this.props.stats._minplaytime}
          </div>
          <div>
            <strong>{"Players: "}</strong>
            {this.props.stats._minplayers !== this.props.stats._maxplayers
              ? `${this.props.stats._minplayers}
              –
              ${this.props.stats._maxplayers}`
              : this.props.stats._minplayers}
          </div>
        </div>
        <div className="Game__year">{this.props.yearpublished}</div>
      </div>
    );
  }
}
