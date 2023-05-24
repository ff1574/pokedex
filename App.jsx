// Imports
import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";

// Get screen width
const { width } = Dimensions.get("window");
const windowWidth = width;

// Function that fetches the original 151 pokemon with their urls
function fetchPokemon(setPokemonData) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allPokemon) {
      const promises = allPokemon.results.map((pokemon) =>
        fetchMoreData(pokemon)
      );
      Promise.all(promises).then((pokemonList) => setPokemonData(pokemonList));
    });
}

function fetchMoreData(pokemon) {
  let url = pokemon.url;
  return fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      return pokeData.name;
    });
}

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetchPokemon(setPokemonData);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="auto" />
      <FlatList
        data={pokemonData}
        renderItem={({ item }) => (
          <View style={styles.pokemonView}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFFAA0",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    backgroundColor: "white",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
