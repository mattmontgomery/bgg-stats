import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { BrowserRouter, NavLink, Route } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changeUsername } from "./Reducers/username";

import GameDrawer from "./Components/GameDrawer";
import UsernamePicker from "./Components/UsernamePicker";

import { Collection, ShelfOfShame, Wishlist } from "./Pages/Collection";

import { IAction, IStoreState, IUsername } from "./Interfaces";

import "./App.scss";

export default class App extends PureComponent {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <UsernamePicker />
          </header>
          <nav className="Nav">
            <NavLink activeClassName="selected" exact={true} to="/">
              {"Collection"}
            </NavLink>
            <NavLink activeClassName="selected" exact={true} to="/wishlist">
              {"Wishlist"}
            </NavLink>
            <NavLink
              activeClassName="selected"
              exact={true}
              to="/shelf-of-shame"
            >
              {"Shelf of Shame"}
            </NavLink>
          </nav>
          <Route path="/" exact={true} component={Collection} />
          <Route path="/wishlist" exact={true} component={Wishlist} />
          <Route path="/shelf-of-shame" exact={true} component={ShelfOfShame} />
          <Route
            path="/:username/collection"
            exact={true}
            component={Collection}
          />
          <Route path="/:username/wishlist" exact={true} component={Wishlist} />
          <Route
            path="/:username/shelf-of-shame"
            exact={true}
            component={ShelfOfShame}
          />
          <GameDrawer />
        </div>
      </BrowserRouter>
    );
  }
}
