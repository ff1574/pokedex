// Function that fetches the original 151 pokemon with their urls
function fetchPokemon(setPokemonData, offset, limit) {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then(function (allPokemon) {
      const promises = allPokemon.results.map((pokemon) =>
        fetchMoreData(pokemon)
      );
      Promise.all(promises).then((newPokemonList) =>
        setPokemonData((oldPokemonList) => [
          ...oldPokemonList,
          ...newPokemonList,
        ])
      );
    });
}

async function fetchSearchResults(searchText, setPokemonData, handleRefresh) {
  if (!searchText) {
    handleRefresh();
    return;
  }
  return fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (pokeData) {
      // Getting / Calculating id, name, image, types, height and width
      let id = pokeData.id;
      let name = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
      let img =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        id +
        ".png";
      let types = pokeData.types.map((typeInfo) => typeInfo.type.name);
      let height = pokeData.height * 10;
      let weight = pokeData.weight / 10;

      // Create a Pokemon object
      let pokemon = {
        id: id,
        name: name,
        img: img,
        types: types,
        height: height,
        weight: weight,
      };

      // Set the Pokemon data
      setPokemonData([pokemon]);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
      handleRefresh();
    });
}

// Helper function that takes the url gotten to fetch all needed additional information
function fetchMoreData(pokemon) {
  let url = pokemon.url;
  return fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      // Getting / Calculating id, name, image, types, height and width
      let id = pokeData.id;
      let name = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
      let img =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        id +
        ".png";
      let types = pokeData.types.map((typeInfo) => typeInfo.type.name);
      let height = pokeData.height * 10;
      let weight = pokeData.weight / 10;
      return { id, name, img, types, height, weight };
    });
}

export default {
  fetchPokemon,
  fetchMoreData,
  fetchSearchResults,
};
