import React, { PureComponent } from "react";

const standardSort = function(
  items: Array<{
    [key: string]: string;
  }>,
  field: string
) {
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

export interface ControlsProps {
  onSort: Function;
}

export default class GamesControls extends PureComponent<ControlsProps> {
  constructor(props: ControlsProps) {
    super(props);
  }
  sortByPlays = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "numplays"));
  sortByYear = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "yearpublished"));
  reverseSort = () => this.props.onSort((i: Array<{}>) => i.reverse());
  standardSort = () =>
    this.props.onSort((i: Array<{}>) => standardSort(i, "name"));
  randomSort = () =>
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
  render() {
    return (
      <div className="Controls">
        <button onClick={this.standardSort}>{"A-Z"}</button>
        <button onClick={this.reverseSort}>{"Z-A"}</button>
        <button onClick={this.sortByPlays}>{"By plays"}</button>
        <button onClick={this.sortByYear}>{"By year"}</button>
        <button onClick={this.randomSort}>{"Randomize"}</button>
      </div>
    );
  }
}
