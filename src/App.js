import React, { Component } from "react";
import { getPokemons } from "./services/pokemonService";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
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
    const filteredPokemon = this.filterPokemon();
    return (
      <div className="app">
        <Header getQuery={this.getQuery} />
        <Main filteredPokemon={filteredPokemon} />
        <Footer />
      </div>
    );
  }
}

export default App;
