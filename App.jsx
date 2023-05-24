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
  Font,
  AppLoading,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Get screen width
const { width } = Dimensions.get("window");
const windowWidth = width;

// Function that fetches the original 151 pokemon with their urls
function fetchPokemon(setPokemonData) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // This returns only pokemon name and url, which is passed to fetchMoreData()
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
      let name = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
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
            onPress={() => navigation.navigate("Pokemon Details", item)}
          >
            <Image source={{ uri: item.img }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>{item.name}</Text>
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
      <Image source={{ uri: img }} style={styles.pokemonImageDetails} />
      <Text>{name}</Text>
      <Text>ID: {id}</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokemonList} />
        <Stack.Screen name="Pokemon Details" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#B3001B",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonView: {
    width: windowWidth * 0.43,
    height: windowWidth * 0.43,
    margin: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    backgroundColor: "#F5F5DC",
    borderRadius: 16,
  },
  pokemonImage: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    resizeMode: "contain",
  },
  pokemonImageDetails: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    resizeMode: "contain",
  },
  pokemonName: {
    fontSize: 20,
  },
});
