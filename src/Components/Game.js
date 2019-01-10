import React, { PureComponent } from "react";

export default class Game extends PureComponent {
  render() {
    return (
      <div className="Game">
        {React.Children.map(this.props.children, (child, index) => {
          if (React.isValidElement(child)) {
            const type =
              typeof child.type === "function" ? child.type.name : child.type;
            return React.cloneElement(child, {
              ...(() => {
                switch (type) {
                  case "GameInfoSection":
                    return this.props;
                  case "GameInfo":
                    return { value: this.props[child.props.field] };
                  case "GameImage":
                    return { thumbnail: this.props.thumbnail };
                  default:
                    return {};
                }
              })(),
              id: this.props._objectid,
              name: this.props.name,
              ...child.props
            });
          }
        })}
        <div className="Game__year">{this.props.yearpublished}</div>
      </div>
    );
  }
}

export class GameImage extends PureComponent {
  render() {
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

export class GameTitle extends PureComponent {
  render() {
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
export class GameInfo extends PureComponent {
  render() {
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
export class GameInfoSection extends PureComponent {
  render() {
    return (
      <div className="Game__info">
        {React.Children.map(this.props.children, (child, index) => {
          if (React.isValidElement(child)) {
            const type =
              typeof child.type === "function" ? child.type.name : child.type;
            return React.cloneElement(child, {
              ...(() => {
                switch (type) {
                  case "GameInfo":
                    return { value: this.props[child.props.field] };
                  default:
                    return { value: {} };
                }
              })()
            });
          }
        })}
      </div>
    );
  }
}
