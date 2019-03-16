const urlPokemon = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";
const urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/";

const getPokemons = () => fetch(urlPokemon).then(response => response.json());
const getSpecies = () => fetch(urlSpecies).then(response => response.json());

export { getPokemons, getSpecies };
