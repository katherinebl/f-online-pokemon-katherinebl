import React, { Component } from "react";
import PokeDetail from "./PokeDetail";

class PokeList extends Component {
  render() {
    const { filteredPokemons } = this.props;

    return (
      <ul className="app__list">
        {filteredPokemons.map((item, index) => {
          return (
            <li className="app__list-item" key={index}>
              <PokeDetail item={item} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default PokeList;
