import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameTitle extends PureComponent<IGame> {
  public static displayName = "GameTitle";
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
            this.props.children,
            (child: React.ReactNode): React.ReactNode => {
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
            }
          )}
        </div>
      </div>
    );
  }
}
