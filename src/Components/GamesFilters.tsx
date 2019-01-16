import React, { PureComponent, createRef } from "react";
import { IGame } from "../Interfaces/Game";

import { connect } from "react-redux";

export interface GamesFilters {
  hideExpansions: boolean;
  onFilter: (item: {}) => boolean;
  onToggleFilter: (field: string, value: boolean) => void;
}

export interface GamesFiltersState {
  numPlayersMin?: Number;
  numPlayersMax?: Number;
  yearMin?: Number;
  yearMax?: Number;
  timeMin?: Number;
  timeMax?: Number;
  playsMin?: Number;
  playsMax?: Number;
}

export class GamesFilters extends PureComponent<GamesFilters> {
  private ref? = createRef<HTMLDivElement>();
  state: GamesFiltersState = {
    numPlayersMin: undefined,
    numPlayersMax: undefined,
    yearMin: undefined,
    yearMax: undefined,
    timeMin: undefined,
    timeMax: undefined,
    playsMin: undefined,
    playsMax: undefined
  };
  constructor(props: GamesFilters) {
    super(props);
    this.state = {
      numPlayersMin: undefined,
      numPlayersMax: undefined,
      yearMin: undefined,
      yearMax: undefined,
      timeMin: undefined,
      timeMax: undefined,
      playsMin: undefined,
      playsMax: undefined
    };
  }
  filterReset = () => {
    this.setState({
      ...Object.keys(this.state).reduce(
        (acc: { [key: string]: string | null }, key) => {
          acc[key] = null;
          return acc;
        },
        {}
      )
    });
    const inputs =
      this.ref && this.ref.current
        ? this.ref.current.querySelectorAll("input").forEach(e => {
            e.value = "";
            e.checked = false;
          })
        : [];
    this.props.onFilter((i: IGame) => true);
  };
  filterRanges = () => {
    const {
      numPlayersMin,
      numPlayersMax,
      yearMin,
      yearMax,
      timeMin,
      timeMax,
      playsMin,
      playsMax
    } = this.state;
    this.props.onFilter((i: IGame) => {
      return (
        (numPlayersMin !== numPlayersMax && numPlayersMin
          ? i.stats._minplayers <= numPlayersMin ||
            i.stats._maxplayers === numPlayersMin
          : true) &&
        (numPlayersMin === numPlayersMax && numPlayersMin
          ? i.stats._minplayers === numPlayersMin &&
            i.stats._maxplayers === numPlayersMax
          : true) &&
        (numPlayersMax !== numPlayersMin && numPlayersMax
          ? i.stats._maxplayers >= numPlayersMax
          : true) &&
        (yearMin ? i.yearpublished >= yearMin : true) &&
        (yearMax ? i.yearpublished <= yearMax : true) &&
        (timeMin ? i.stats._minplaytime >= timeMin : true) &&
        (timeMax ? i.stats._maxplaytime <= timeMax : true) &&
        (typeof playsMin !== "undefined" ? i.numplays >= playsMin : true) &&
        (typeof playsMax !== "undefined" ? i.numplays <= playsMax : true)
      );
    });
  };
  setRangeFilter = (field: string, value: string) => {
    this.setState(
      {
        [field]: value !== "" ? parseInt(value) : undefined
      },
      this.filterRanges
    );
  };
  setNamedFilter = (field: string, value: boolean) => {
    this.props.onToggleFilter(field, value);
  };
  render() {
    return (
      <div className="Controls Filters" ref={this.ref}>
        <button onClick={this.filterReset}>{"Reset"}</button>
        <div>
          <label>{"Year"}</label>
          <input
            id="yearMin"
            onChange={ev => this.setRangeFilter("yearMin", ev.target.value)}
            type="number"
          />
          {" — "}
          <input
            id="yearMax"
            onChange={ev => this.setRangeFilter("yearMax", ev.target.value)}
            type="number"
          />
        </div>
        <div>
          <label>{"Player Count"}</label>
          <input
            onChange={ev =>
              this.setRangeFilter("numPlayersMin", ev.target.value)
            }
            type="number"
          />
          {" — "}
          <input
            onChange={ev =>
              this.setRangeFilter("numPlayersMax", ev.target.value)
            }
            type="number"
          />
        </div>
        <div>
          <label>{"Play Time"}</label>
          <input
            onChange={ev => this.setRangeFilter("timeMin", ev.target.value)}
            type="number"
          />
          {" — "}
          <input
            onChange={ev => this.setRangeFilter("timeMax", ev.target.value)}
            type="number"
          />
        </div>
        <div>
          <label>{"Plays"}</label>
          <input
            onChange={ev => this.setRangeFilter("playsMin", ev.target.value)}
            type="number"
          />
          {" — "}
          <input
            onChange={ev => this.setRangeFilter("playsMax", ev.target.value)}
            type="number"
          />
        </div>
        <div>
          <label>{"Hide expansions"}</label>
          <input
            defaultChecked={this.props.hideExpansions}
            onChange={ev =>
              this.setNamedFilter("hideExpansions", !!ev.target.checked)
            }
            type="checkbox"
          />
        </div>
      </div>
    );
  }
}

export default connect(({ filters }: { filters: {} }) => ({
  ...filters
}))(GamesFilters);
