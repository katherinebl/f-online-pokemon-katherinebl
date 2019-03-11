import React, { Component } from "react";
import PropTypes from "prop-types";

class Filter extends Component {
  render() {
    const { getQuery } = this.props;

    return (
      <div className="app__filter">
        <div className="app__filter-item">
          <label htmlFor="query">
            <input
              id="query"
              className="app__filter-name"
              type="text"
              placeholder="Filter pokemons by name..."
              onKeyUp={getQuery}
            />
          </label>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  getQuery: PropTypes.func.isRequired
};

export default Filter;
