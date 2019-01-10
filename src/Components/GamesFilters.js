import React, { PureComponent } from "react";
import { connect } from "react-redux";

export class GamesFilters extends PureComponent {
  state = {
    numPlayersMin: null,
    numPlayersMax: null,
    yearMin: null,
    yearMax: null,
    timeMin: null,
    timeMax: null,
    playsMin: null,
    playsMax: null
  };
  constructor(props) {
    super(props);
    this.state = {
      numPlayersMin: null,
      numPlayersMax: null,
      yearMin: null,
      yearMax: null,
      timeMin: null,
      timeMax: null,
      playsMin: null,
      playsMax: null
    };
  }
  filterReset = () => {
    this.setState({
      ...Object.entries(this.state).reduce((acc, item) => {
        acc[item] = null;
        return acc;
      }, {})
    });
    this.ref.querySelectorAll("input").forEach(e => {
      e.value = "";
      e.checked = "";
    });
    this.props.onFilter(i => true);
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
    this.props.onFilter(i => {
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
        (playsMin !== null ? i.numplays >= playsMin : true) &&
        (playsMax !== null ? i.numplays <= playsMax : true)
      );
    });
  };
  setRangeFilter = (field, value) => {
    this.setState(
      {
        [field]: value !== "" ? parseInt(value) : null
      },
      this.filterRanges
    );
  };
  setNamedFilter = (field, value) => {
    this.props.onToggleFilter(field, value);
  };
  render() {
    return (
      <div className="Controls Filters" ref={e => (this.ref = e)}>
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
              this.setNamedFilter({ hideExpansions: !!ev.target.checked })
            }
            type="checkbox"
          />
        </div>
      </div>
    );
  }
}

export default connect(({ filters }) => ({
  ...filters
}))(GamesFilters);
