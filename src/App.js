import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import Filter from "./components/Filter";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: ""
    };

    this.getPokemonList = this.getPokemonList.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
  }

  componentDidMount() {
    this.getSavedData();
  }

  saveData(id, results) {
    localStorage.setItem(results, JSON.stringify(id));
  }

  getSavedData() {
    const pokeData = localStorage.getItem("results");
    if (pokeData !== null) {
      const savedPokemon = JSON.parse(pokeData);
      this.setState({
        results: savedPokemon
      });
    } else {
      this.getPokemonList();
    }
  }

  getPokemonList() {
    let pokemonData = [];

    getPokemons().then(data => {
      let arrayLength = data.results.length;
      for (const item of data.results) {
        let urlItem = item.url;
        let urlRequested = fetch(urlItem).then(response => response.json());

        urlRequested.then(datas => {
          pokemonData.push(datas);
          if (pokemonData.length === arrayLength) {
            pokemonData.sort((a, b) => a.id - b.id);
            this.setState({
              results: pokemonData
            });
            this.saveData(pokemonData, "results");
          }
        });
      }
    });
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
      return name.toUpperCase().includes(this.state.query.toUpperCase());
    });
    return filteredResults;
  }

  render() {
    const filteredPokemons = this.filterPokemon();
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Find your Pokemon :D</h1>
          <Filter getQuery={this.getQuery} />
        </header>
        <main className="app__main">
          <div className="app__wrapper">
            <ul className="app__list">
              {filteredPokemons.map((item, index) => {
                return (
                  <li className="app__list-item" key={index}>
                    <div className="item-pokemon">
                      <div className="grey_container">
                        <img
                          className="img"
                          src={item.sprites.front_default}
                          alt={item.name}
                        />
                        <p className="pokemon-id">ID / {item.id}</p>
                      </div>
                      <div className="information">
                        <h2 className="pokemon-name">{item.name}</h2>
                        <ul className="pokemon-type">
                          {item.types.map((item, index) => (
                            <li className="type" key={index}>
                              {item.type.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
