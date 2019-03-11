import React, { Component } from "react";
import PokeList from "../PokeList";

class Main extends Component {
  render() {
    const { filteredPokemon } = this.props;

    return (
      <main className="app__main">
        <div className="app__wrapper">
          <PokeList filteredPokemon={filteredPokemon} />
        </div>
      </main>
    );
  }
}

export default Main;
