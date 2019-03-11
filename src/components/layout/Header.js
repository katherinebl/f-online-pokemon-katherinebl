import React, { Component } from "react";
import Filter from "../Filter";

class Header extends Component {
  render() {
    const { getQuery } = this.props;

    return (
      <header className="app__header">
        <div className="triangle t-left" />
        <div className="triangle t-right" />
        <h1 className="app__title">Find your Pokemon :D</h1>
        <Filter getQuery={getQuery} />
      </header>
    );
  }
}

export default Header;
