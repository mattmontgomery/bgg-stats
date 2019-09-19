import React, { PureComponent } from "react";
import "../style/GamesControls.scss";

const standardSort = (
  items: Array<{
    [key: string]: string;
  }>,
  field: string
) => {
  return items.sort((a, b) => {
    if (a[field] > b[field]) {
      return -1;
    }
    if (a[field] < b[field]) {
      return 1;
    }
    return 0;
  });
};

export interface IControlsProps {
  onSort: (i: {}) => void;
}

export default class GamesControls extends PureComponent<IControlsProps> {
  constructor(props: IControlsProps) {
    super(props);
  }
  public sortByPlays = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "numplays"));
  public sortByYear = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "yearpublished"));
  public reverseSort = () => this.props.onSort((i: Array<{}>) => i.reverse());
  public standardSort = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "name"));
  public randomSort = () =>
    this.props.onSort((i: Array<{}>) =>
      i.sort((a, b) => {
        const rand = Math.random();
        if (rand > 0.6) {
          return 1;
        }
        if (rand < 0.4) {
          return -1;
        }
        return 0;
      })
    );
  public render() {
    return (
      <div className="Controls Controls--with-label">
        <label>{"Sort: "}</label>
        <button onClick={this.standardSort}>{"A-Z"}</button>
        <button onClick={this.reverseSort}>{"Z-A"}</button>
        <button onClick={this.sortByPlays}>{"By plays"}</button>
        <button onClick={this.sortByYear}>{"By year"}</button>
        <button onClick={this.randomSort}>{"Randomize"}</button>
      </div>
    );
  }
}
