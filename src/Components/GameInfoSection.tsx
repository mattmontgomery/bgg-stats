import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";
import { GameInfo } from "./Game";

export default class GameInfoSection extends PureComponent<IGame> {
  public render() {
    return (
      <div className="Game__info">
        {React.Children.map(
          this.props.children as React.ReactChild[],
          (child: React.ReactChild) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                ...(() => {
                  switch (child.type) {
                    case GameInfo:
                      return {
                        value: (this.props as any)[(child.props as any).field]
                      };
                    default:
                      return null;
                  }
                })()
              });
            }
            return child;
          }
        )}
      </div>
    );
  }
}
