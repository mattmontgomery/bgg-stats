import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import GameDrawer from "./Components/GameDrawer";
import UsernamePicker from "./Components/UsernamePicker";

import { Collection, Wishlist, ShelfOfShame } from "./Pages/Collection";
import "./App.scss";

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <UsernamePicker />
          </header>
          <nav className="Nav">
            <NavLink activeClassName="selected" exact to="/">
              {"Collection"}
            </NavLink>
            <NavLink activeClassName="selected" exact to="/wishlist">
              {"Wishlist"}
            </NavLink>
            <NavLink activeClassName="selected" exact to="/shelf-of-shame">
              {"Shelf of Shame"}
            </NavLink>
          </nav>
          <Route path="/" exact component={Collection} />
          <Route path="/wishlist" exact component={Wishlist} />
          <Route path="/shelf-of-shame" exact component={ShelfOfShame} />
          <Route path="/:username/collection" exact component={Collection} />
          <Route path="/:username/wishlist" exact component={Wishlist} />
          <Route
            path="/:username/shelf-of-shame"
            exact
            component={ShelfOfShame}
          />
          <GameDrawer />
        </div>
      </Router>
    );
  }
}
