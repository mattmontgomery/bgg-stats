import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameTitle extends PureComponent<IGame> {
  public render() {
    return (
      <div className="Game__title">
        <a
          className="Game__title-link"
          href={`http://boardgamegeek.com/boardgame/${this.props.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {this.props.name}
        </a>
        <div className="Game__title-controls">
          {React.Children.map(
            this.props.children as React.ReactChild[],
            (child: React.ReactChild): React.ReactChild => {
              if (React.isValidElement(child)) {
                const childProps: { onClick?: () => void } =
                  typeof child.props === "object" && child.props
                    ? child.props
                    : {};
                return React.cloneElement(child as React.ReactElement<any>, {
                  ...childProps,
                  id: this.props.id,
                  onClick:
                    typeof childProps.onClick === "function"
                      ? childProps.onClick.bind(null, this.props.id)
                      : null
                });
              }
              return child;
            }
          )}
        </div>
      </div>
    );
  }
}
