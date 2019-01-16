import React, { PureComponent } from "react";
import { IGame } from "../Interfaces/Game";
import * as PropTypes from "prop-types";

export interface GameInfoProps {
  field: string;
  label: string;
  render: (props: {}) => React.ReactNode;
}

export default class Game extends PureComponent<IGame> {
  renderChild = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child)) {
      const type: string | undefined =
        typeof child.type === "function" ? child.type.displayName : child.type;
      return React.cloneElement(child as React.ReactElement<any>, {
        name: this.props.name,
        ...(() => {
          switch (type) {
            case "GameInfoSection":
              return this.props;
            case "GameYear":
              return { yearpublished: this.props.yearpublished };
            case "GameTitle":
              return {
                name: this.props.name,
                id: this.props._objectid
              };
            case "GameInfo":
              return {
                value: (this.props as any)[(child.props as any).field]
              };
            case "GameImage":
              return { thumbnail: this.props.thumbnail };
            default:
              return null;
          }
        })(),
        ...child.props
      });
    }
  };
  render() {
    return (
      <div className="Game">
        {React.Children.map(this.props.children, this.renderChild)}
      </div>
    );
  }
}

export class GameImage extends PureComponent<IGame> {
  static displayName = "GameImage";
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

export class GameTitle extends PureComponent<IGame> {
  static displayName = "GameTitle";
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
export class GameInfoSection extends PureComponent<IGame> {
  static displayName = "GameInfoSection";
  render() {
    return (
      <div className="Game__info">
        {React.Children.map(this.props.children, (child: React.ReactChild) => {
          if (React.isValidElement(child)) {
            const type: string | undefined =
              typeof child.type === "function"
                ? child.type.displayName
                : child.type;
            return React.cloneElement(child as React.ReactElement<any>, {
              ...(() => {
                switch (type) {
                  case "GameInfo":
                    return {
                      value: (this.props as any)[(child.props as any).field]
                    };
                  default:
                    return null;
                }
              })()
            });
          }
        })}
      </div>
    );
  }
}

export class GameInfo extends PureComponent<GameInfoProps> {
  static displayName = "GameInfo";
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
export class GameYear extends PureComponent<IGame> {
  static displayName = "GameYear";
  render() {
    return <div className="Game__year">{this.props.yearpublished}</div>;
  }
}
