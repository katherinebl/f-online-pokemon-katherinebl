import React, { Component } from "react";
import "./App.css";

const ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    this.getPokemonList();
  }

  getPokemonList() {
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        console.log("hola", data);
      });
    console.log("hola2");
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
