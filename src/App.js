import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    this.getPokemonList();
  }

  getPokemonList() {
    getPokemons().then(data => {
      const newResults = data.results.map((item, index) => {
        return { ...item, id: index };
      });
      this.setState({
        results: newResults
      });
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
