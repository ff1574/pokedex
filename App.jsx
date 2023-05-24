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
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

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

// Helper function that takes the url gotten to fetch all needed information
function fetchMoreData(pokemon) {
  let url = pokemon.url;
  return fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      let id = pokeData.id;
      let name = pokeData.name;
      let img =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
        id +
        ".png";
      console.log({ id, name, img });
      return { id, name, img };
    });
}

function PokemonList({ navigation }) {
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
          <TouchableOpacity
            style={styles.pokemonView}
            onPress={() => navigation.navigate("PokemonDetails", item)}
          >
            <Image source={{ uri: item.img }} style={styles.pokemonImage} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

function PokemonDetails({ route }) {
  const { id, name, img } = route.params;

  return (
    <SafeAreaView style={styles.main}>
      <Image source={{ uri: img }} style={styles.pokemonImage} />
      <Text>{name}</Text>
      <Text>ID: {id}</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PokemonList" component={PokemonList} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
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
  pokemonImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: "contain",
  },
});
