import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { IGame } from "../Interfaces";
import GameImage from "./GameImage";
import GameInfo from "./GameInfo";
import GameInfoSection from "./GameInfoSection";
import GameTitle from "./GameTitle";
import GameYear from "./GameYear";

export interface IGameInfoProps {
  field: string;
  label: string;
  render: (props: {}) => React.ReactNode;
}

interface IHasChildren {
  children: React.ReactChild[]
}

export default class Game extends PureComponent<IGame & IHasChildren> {
  public renderChild = (child: React.ReactChild): React.ReactChild => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        name: this.props.name,
        ...(() => {
          switch (child.type) {
            case GameInfoSection:
              return this.props;
            case GameYear:
              return { yearpublished: this.props.yearpublished };
            case GameTitle:
              return {
                id: this.props._objectid,
                name: this.props.name
              };
            case GameInfo:
              return {
                value: (this.props as any)[(child.props as any).field]
              };
            case GameImage:
              return { thumbnail: this.props.thumbnail };
            default:
              return null;
          }
        })(),
        ...child.props
      });
    }
    return child;
  };
  public render() {
    return (
      <div className="Game">
        {React.Children.map(this.props.children as React.ReactChild[], this.renderChild)}
      </div>
    );
  }
}

export { GameImage, GameInfoSection, GameInfo, GameTitle, GameYear };
