import React, { PureComponent } from "react";

const standardSort = function(items, field) {
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

export default class GamesControls extends PureComponent {
  constructor(props) {
    super(props);
    this.sortByPlays = _ => this.props.onSort(i => standardSort(i, "numplays"));
    this.sortByYear = _ =>
      this.props.onSort(i => standardSort(i, "yearpublished"));
    this.reverseSort = _ => this.props.onSort(i => i.reverse());
    this.standardSort = _ => this.props.onSort(i => i);
  }
  render() {
    return (
      <div className="Controls">
        <button onClick={this.standardSort}>{"A-Z"}</button>
        <button onClick={this.reverseSort}>{"Z-A"}</button>
        <button onClick={this.sortByPlays}>{"By plays"}</button>
        <button onClick={this.sortByYear}>{"By year"}</button>
      </div>
    );
  }
}
