import React, { Component } from "react";
import PokeDetail from "./PokeDetail";

class PokeList extends Component {
  render() {
    const { filteredPokemon } = this.props;

    return (
      <ul className="app__list">
        {filteredPokemon.map((item, index) => {
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
