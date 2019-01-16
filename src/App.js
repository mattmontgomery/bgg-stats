import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Collection, Wishlist, ShelfOfShame } from "./Pages/Collection";
import "./App.scss";

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
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
        </div>
      </Router>
    );
  }
}
