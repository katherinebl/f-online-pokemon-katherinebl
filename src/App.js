import React, { Component } from "react";
import { getPokemons, getSpecies } from "./services/pokemonService";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      query: "",
      species: []
    };
  }

  componentDidMount() {
    this.getSavedData();
  }

  saveData(id, results) {
    localStorage.setItem(results, JSON.stringify(id));
  }

  getSavedData = () => {
    const pokeData = localStorage.getItem("results");
    if (pokeData !== null) {
      const savedPokemon = JSON.parse(pokeData);
      this.setState({
        results: savedPokemon
      });
    } else {
      this.getPokemonList();
    }
  };

  getPokemonList = () => {
    let pokemonData = [];

    getPokemons().then(data => {
      let pokeArray = data.results.length;
      for (const item of data.results) {
        let urlItem = item.url;
        let urlRequested = fetch(urlItem).then(response => response.json());

        urlRequested.then(data => {
          pokemonData.push(data);
          if (pokemonData.length === pokeArray) {
            pokemonData.sort((a, b) => a.id - b.id);
            this.setState({
              results: pokemonData //aqui ya tengo los pokemon ordenados
            });
            this.saveData(pokemonData, "results");
          }
        });
      }
    });

    let speciesData = [];

    getSpecies().then(data => {
      let speciesArray = data.results.length;
      for (const item of data.results) {
        let urlItem = item.url;
        let urlRequested = fetch(urlItem).then(response => response.json());

        urlRequested.then(data => {
          speciesData.push(data);
          if (speciesData.length === speciesArray) {
            speciesData.sort((a, b) => a.id - b.id);
            this.setState({
              species: speciesData //deberia tener las especies ordenadas
            });
            this.saveData(speciesData, "species");
          }
        });
        console.log(speciesData);
      }
    });
    console.log("funciona");
  };

  getQuery = e => {
    const userQuery = e.currentTarget.value;
    this.setState({
      query: userQuery
    });
  };

  filterPokemon = () => {
    const filteredResults = this.state.results.filter(item => {
      const name = item.name;
      return name.toUpperCase().includes(this.state.query.toUpperCase());
    });
    return filteredResults;
  };

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
