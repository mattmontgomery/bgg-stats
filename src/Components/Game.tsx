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

export default class Game extends PureComponent<IGame> {
  public renderChild = (child: React.ReactNode): React.ReactNode => {
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
                id: this.props._objectid,
                name: this.props.name,
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
  public render() {
    return (
      <div className="Game">
        {React.Children.map(this.props.children, this.renderChild)}
      </div>
    );
  }
}

export {GameImage,GameInfoSection,GameInfo,GameTitle,GameYear}
