const endpoint = "https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0";

const getPokemons = () => fetch(endpoint).then(response => response.json());

export { getPokemons };
