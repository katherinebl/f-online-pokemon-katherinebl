import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: this.getSavedData()
    };

    this.getPokemonList();
  }

  saveData(newResults) {
    localStorage.setItem("pokeData", JSON.stringify(newResults));
  }

  getSavedData() {
    const pokeData = localStorage.getItem("pokeData");

    if (pokeData !== null) {
      return JSON.parse(pokeData);
    } else {
      this.getPokemonList();
      return [];
    }
  }

  getPokemonList() {
    getPokemons().then(data => {
      const newResults = data.results.map((item, index) => {
        return { ...item, id: index };
      });
      this.setState({
        results: newResults
      });
      this.saveData(newResults);
    });
  }

  render() {
    return (
      <div className="app">
        <main className="app__main">
          <div className="app__main-wrapper">
            <ul className="app__main-list" />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
