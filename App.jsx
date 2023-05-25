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
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgUri } from "react-native-svg";

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Load font

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

// Main page of the application, shows a table of all pokemon and a search bar
function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPokemon(setPokemonData);
  }, []);

  // Getting the table to show data that was input into search bar
  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokemon..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <FlatList
        data={filteredPokemonData}
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

// Function that returns an svg icon for the type of pokemon, used in PokemonDetails

// When clicked on pokemon, this page shows with more details
function PokemonDetails({ route }) {
  const { id, name, img, types, height, weight } = route.params;

  return (
    <SafeAreaView style={styles.mainDetails}>
      <Image source={{ uri: img }} style={styles.pokemonImageDetails} />
      <Text style={styles.pokemonNameDetails}>{name}</Text>
      <View style={styles.pokemonViewDetails}>
        <Text style={styles.pokemonTextDetails}>ID: {id}</Text>
        <Text style={styles.pokemonTextDetails}>Height: {height}cm</Text>
        <Text style={styles.pokemonTextDetails}>Weight: {weight}kg</Text>
        <Text style={styles.pokemonTextDetails}>Types:</Text>
        <FlatList
          data={types}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 30,
              }}
            >
              <Text style={styles.pokemonTextDetails}>{`\u2022 ${item}`}</Text>
              <Image
                source={require("./assets/types/bug.png")}
                style={styles.typeIcon}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

// Info page with hardcoded information
function Info() {
  return (
    <SafeAreaView style={styles.mainInfo}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <Image
            source={require("./assets/pokemon-title.png")}
            style={styles.infoImage}
          />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Author: Franko Fister</Text>
          <Text style={styles.infoText}>
            Task: React Native app that connects to RestAPI
          </Text>
          <Text style={styles.infoText}>Company: b2match</Text>
          <Text style={styles.infoText}>API: PokeAPI</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>How to use the app:</Text>
          <Text style={styles.infoText}>
            {`\u2022`} Search for the pokemon you would like to view
          </Text>
          <Text style={styles.infoText}>
            {`\u2022`} Click on the pokemon to display data about it
          </Text>
          <Text style={styles.infoText}>
            {`\u2022`} Have fun exploring interesting pokemon!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Function for bottom tab navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: { fontSize: 20, marginBottom: 14 },
      }}
    >
      <Stack.Screen name="Pokedex" component={PokemonList} />
      <Stack.Screen name="Info" component={Info} />
    </Tab.Navigator>
  );
}

// Navigation between table and details page, render
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pokemon Details" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#B3001B",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "black",
    borderTopWidth: 3,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  mainDetails: {
    flex: 1,
    backgroundColor: "#B3001B",
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 3,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  mainInfo: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#B3001B",
    padding: 15,
    borderTopColor: "black",
    borderTopWidth: 3,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  pokemonView: {
    width: windowWidth * 0.43,
    height: windowWidth * 0.43,
    margin: 10,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "black",
  },
  pokemonImage: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    resizeMode: "contain",
  },
  pokemonImageDetails: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    resizeMode: "contain",
  },
  pokemonNameDetails: {
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "white",
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 22,
    borderColor: "black",
    borderWidth: 3,
  },
  pokemonTextDetails: {
    fontSize: 22,
    color: "black",
    marginTop: 12,
    marginRight: 80,
  },
  pokemonViewDetails: {
    width: windowWidth * 0.8,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    marginTop: 30,
  },
  typeIcon: {
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    resizeMode: "contain",
    marginTop: 8,
  },
  pokemonName: {
    fontSize: 20,
  },
  infoText: {
    fontSize: 20,
    color: "black",
    marginVertical: 6,
  },
  infoImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8 * (9 / 16),
    resizeMode: "contain",
  },
  infoView: {
    backgroundColor: "white",
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 3,
    marginBottom: 20,
    padding: 10,
    width: windowWidth * 0.9,
  },
  searchBar: {
    marginVertical: 30,
    height: 60,
    width: windowWidth * 0.8,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontSize: 20,
  },
});
