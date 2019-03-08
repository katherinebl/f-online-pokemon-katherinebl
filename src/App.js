import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: this.getSavedData()
    };
    this.getQuery = this.getQuery.bind(this);
  }

  getQuery(e) {
    const userQuery = e.currentTarget.value;
    this.setState({
      query: userQuery
    });
  }

  filterPokemon() {
    const filteredResults = this.state.results.filter(item => {
      const name = item.name;
      if (name.toUpperCase().includes(this.state.query.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    });
    return filteredResults;
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
    const pokeResults = this.filterPokemon();
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">POKEDEX</h1>
          <div className="app__filter">
            <div className="app__filter-item">
              <input
                className="app__filter-name"
                type="text"
                placeholder="Filter pokemons by name..."
                onKeyUp={this.getQuery}
              />
            </div>
          </div>
        </header>
        <main className="app__main">
          <div className="app__wrapper">
            <ul className="app__list" />
            {pokeResults.map(item => {
              return (
                <li className="app__list-item" id={item.id} key={item.id}>
                  {item.name}
                </li>
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
