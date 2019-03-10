import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      results: [],
      pokeList: [],
      havePokemons: false
    };
    this.getQuery = this.getQuery.bind(this);
    this.getPokemonList = this.getPokemonList.bind(this);
    this.getPoke = this.getPoke.bind(this);
    this.filterPokemon = this.filterPokemon.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
  }

  componentDidMount() {
    this.getPokemonList();
    console.log("se ha montado");
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

  saveData(pokeId, pokeList) {
    localStorage.setItem(pokeList, JSON.stringify(pokeId));
  }

  getSavedData() {
    const pokeData = localStorage.getItem("pokeData");
    if (pokeData !== null) {
      const savedPokemon = JSON.parse(pokeData);
      this.setState({
        pokeList: savedPokemon,
        havePokemons: true
      });
    } else {
      this.getPokemonList();
    }
  }

  getPokemonList() {
    let pokemonUrl = [];
    getPokemons()
      .then(data => {
        data.results.map(item => {
          const getUrl = fetch(item.url).then(response => response.json());
          getUrl.then(data => {
            pokemonUrl.push(data);
            this.getPoke(pokemonUrl);
          });
        });
      })
      .catch(error => alert(`An error has ocurred: ${error}`));
  }

  getPoke(data) {
    let pokemonData = [];

    data.map(pokeData => {
      let types = [];
      pokeData.types.map(pokeTypes => {
        return types.push(pokeTypes.type.name);
      });

      let pokemonJson = {
        id: pokeData.id,
        name: pokeData.name,
        type: pokeData.types,
        image: pokeData.sprites.front_default
      };

      pokemonData.push(pokemonJson);

      this.setState({
        pokeList: pokemonData.sort((a, b) => a.id - b.id),
        havePokemons: true
      });
      return pokemonData;
    });

    this.saveData(this.state.pokeList, "pokeList");
  }

  render() {
    const pokeResults = this.filterPokemon();
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Find your Pokemon :D</h1>
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
                  {item.name} {item.id} {item.sprites}
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
