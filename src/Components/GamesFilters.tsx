import React, { createRef, PureComponent } from "react";
import { IGame } from "../Interfaces";

import { connect } from "react-redux";

export interface IGamesFilters {
  hideExpansions?: boolean;
  onFilter: (item: {}) => boolean;
  onToggleFilter: (field: string, value: boolean) => void;
}

export interface IGamesFiltersState {
  numPlayersMin?: number;
  numPlayersMax?: number;
  yearMin?: number;
  yearMax?: number;
  timeMin?: number;
  timeMax?: number;
  playsMin?: number;
  playsMax?: number;
}

export class GamesFilters extends PureComponent<IGamesFilters> {
  public state: IGamesFiltersState = {
    numPlayersMax: undefined,
    numPlayersMin: undefined,
    playsMax: undefined,
    playsMin: undefined,
    timeMax: undefined,
    timeMin: undefined,
    yearMax: undefined,
    yearMin: undefined
  };
  private ref? = createRef<HTMLDivElement>();
  constructor(props: IGamesFilters) {
    super(props);
    this.state = {
      numPlayersMax: undefined,
      numPlayersMin: undefined,
      playsMax: undefined,
      playsMin: undefined,
      timeMax: undefined,
      timeMin: undefined,
      yearMax: undefined,
      yearMin: undefined
    };
  }
  public filterReset = () => {
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
  public filterRanges = () => {
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
  public setRangeFilter = (field: string, value: string) => {
    this.setState(
      {
        [field]: value !== "" ? parseInt(value, 0) : undefined
      },
      this.filterRanges
    );
  };
  public setNamedFilter = (field: string, value: boolean) => {
    this.props.onToggleFilter(field, value);
  };
  public setRangeFilterYearMin = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("yearMin", ev.currentTarget.value);
  public setRangeFilterYearMax = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("yearMax", ev.currentTarget.value);
  public setNumPlayersMin = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("numPlayersMin", ev.currentTarget.value);
  public setNumPlayersMax = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("numPlayersMax", ev.currentTarget.value);
  public setTimeMin = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("timeMin", ev.currentTarget.value);
  public setTimeMax = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("timeMax", ev.currentTarget.value);
  public setPlaysMin = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("playsMin", ev.currentTarget.value);
  public setPlaysMax = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setRangeFilter("playsMax", ev.currentTarget.value);
  public toggleExpansions = (ev: React.FormEvent<HTMLInputElement>) =>
    this.setNamedFilter("hideExpansions", !!ev.currentTarget.checked);

  public render() {
    return (
      <div className="Controls Filters" ref={this.ref}>
        <button onClick={this.filterReset}>{"Reset"}</button>
        <div>
          <label>{"Year"}</label>
          <input
            id="yearMin"
            onChange={this.setRangeFilterYearMin}
            type="number"
          />
          {" — "}
          <input
            id="yearMax"
            onChange={this.setRangeFilterYearMax}
            type="number"
          />
        </div>
        <div>
          <label>{"Player Count"}</label>
          <input onChange={this.setNumPlayersMin} type="number" />
          {" — "}
          <input onChange={this.setNumPlayersMax} type="number" />
        </div>
        <div>
          <label>{"Play Time"}</label>
          <input onChange={this.setTimeMin} type="number" />
          {" — "}
          <input onChange={this.setTimeMax} type="number" />
        </div>
        <div>
          <label>{"Plays"}</label>
          <input onChange={this.setPlaysMin} type="number" />
          {" — "}
          <input onChange={this.setPlaysMax} type="number" />
        </div>
        <div>
          <label>{"Hide expansions"}</label>
          <input
            defaultChecked={this.props.hideExpansions}
            onChange={this.toggleExpansions}
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
