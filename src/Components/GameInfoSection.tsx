import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";

export default class GameInfoSection extends PureComponent<IGame> {
  public static displayName = "GameInfoSection";
  public render() {
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
