// Imports
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgUri } from "react-native-svg";
import BugImage from "./assets/types/bug.png"; // I know this is ugly, should be separated to different file
import DarkImage from "./assets/types/dark.png";
import DragonImage from "./assets/types/dragon.png";
import ElectricImage from "./assets/types/electric.png";
import FairyImage from "./assets/types/fairy.png";
import FightingImage from "./assets/types/fighting.png";
import FireImage from "./assets/types/fire.png";
import FlyingImage from "./assets/types/flying.png";
import GhostImage from "./assets/types/ghost.png";
import GrassImage from "./assets/types/grass.png";
import GroundImage from "./assets/types/ground.png";
import IceImage from "./assets/types/ice.png";
import NormalImage from "./assets/types/normal.png";
import PoisonImage from "./assets/types/poison.png";
import PsychicImage from "./assets/types/psychic.png";
import RockImage from "./assets/types/rock.png";
import SteelImage from "./assets/types/steel.png";
import WaterImage from "./assets/types/water.png";
import * as Font from "expo-font";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";

// Create Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

// Main page of the application, shows a table of all pokemon and a search bar
function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchPokemon(setPokemonData);
  }, []);

  // Filtering list data input into the searchbar
  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    // Main view
    <SafeAreaView style={styles.main}>
      {/* Search bar view, placeholder text, connected to the setSearchText state */}
      <View style={styles.searchBarView}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokemon..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {/* List of all the original 151 pokemon, for every pokemon fetched, it creates a TouchableOpacity view with the pokemon name and image */}
      {/* When clicked, it goes to the pokemon details page associated with the ID, which fetches more information */}
      <FlatList
        data={filteredPokemonData}
        style={{ paddingTop: 20 }}
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

// Function that returns path of icon for the type of pokemon, used in PokemonDetails
const typeImages = {
  bug: BugImage,
  dark: DarkImage,
  dragon: DragonImage,
  electric: ElectricImage,
  fairy: FairyImage,
  fighting: FightingImage,
  fire: FireImage,
  flying: FlyingImage,
  ghost: GhostImage,
  grass: GrassImage,
  ground: GroundImage,
  ice: IceImage,
  normal: NormalImage,
  poison: PoisonImage,
  psychic: PsychicImage,
  rock: RockImage,
  steel: SteelImage,
  water: WaterImage,
};

// When clicked on pokemon, this page shows with more details
function PokemonDetails({ route }) {
  // Fetches all needed info with the fetchMoreData() function
  const { id, name, img, types, height, weight } = route.params;

  // States for switch to switch between imperial and metric units
  const [isMetric, setIsMetric] = useState(false);
  const toggleSwitch = () => setIsMetric((previousState) => !previousState);

  // Text that switches depending on what units user selected, direct imperial calculation
  const displayHeight = isMetric
    ? `${(height * 0.393701).toFixed(2)} in`
    : `${height} cm`;
  const displayWeight = isMetric
    ? `${(weight * 2.20462).toFixed(2)} lbs`
    : `${weight} kg`;

  const getTypeImage = (type) => {
    if (typeImages[type]) {
      return typeImages[type];
    }
    // Default image if type is not found in the mapping object
    return null;
  };

  return (
    // Main view
    <SafeAreaView style={styles.mainDetails}>
      <ScrollView>
        {/* Shows everything in a list-like fashion */}
        <Image source={{ uri: img }} style={styles.pokemonImageDetails} />
        <Text style={styles.pokemonNameDetails}>{name}</Text>
        <View style={styles.pokemonViewDetails}>
          <Text style={styles.pokemonTextDetails}>ID: {id}</Text>
          <Text style={styles.pokemonTextDetails}>Height: {displayHeight}</Text>
          <Text style={styles.pokemonTextDetails}>Weight: {displayWeight}</Text>
          <Text style={styles.pokemonTextDetails}>Types:</Text>
          {/* Creates a map which assigns the necessary icon depending on the type of the pokemon */}
          {/* For every type, it creates a View that gives a bullet with type name and icon */}
          {/* This is made future proof because in later games, a pokemon can have 3 types */}
          {types.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 30,
              }}
            >
              <Text style={styles.pokemonTextDetails}>{`\u2022 ${item}`}</Text>
              <Image source={getTypeImage(item)} style={styles.typeIcon} />
            </View>
          ))}
          {/* View for the switch container, some basic switch styling and text to understand what the switch does */}
          <View style={styles.switchContainer}>
            <Text style={[styles.pokemonTextDetails, { marginBottom: 6 }]}>
              Metric
            </Text>
            <Switch
              trackColor={{ false: "#3e3e3e", true: "#3e3e3e" }}
              thumbColor={isMetric ? "#F9665E" : "#81b0ff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isMetric}
              style={{ margin: 5 }}
            />
            <Text
              style={[
                styles.pokemonTextDetails,
                { marginBottom: 6, marginLeft: 5 },
              ]}
            >
              Imperial
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Info page with hardcoded information
function Info() {
  return (
    // Main view
    <SafeAreaView style={styles.mainInfo}>
      <ScrollView>
        {/* View just to display the Pokemon title image */}
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
        {/* Hardcoded information like author, api etc. Short tutorial on how to use app */}
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
    // This creates the bottom tab, some basic styling and the two tabs to switch between screens
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

// Navigation between pokemon list and details page
export default function App() {
  // Adding custom font for details page
  const [fontsLoaded] = useFonts({
    VT323_400Regular,
  });
  // Force loading if app cannot connect to google fonts
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

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
  // ***************************Styles for list page***************************
  // SafeAreaView
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
  // Pokemon div/view that display each pokemon, with image and name inside
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
  // Pokemon name inside PokemonView
  pokemonName: {
    fontSize: 20,
  },
  // Pokemon image inside PokemonImage
  pokemonImage: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    resizeMode: "contain",
  },
  // Search bar styling
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
  // Search bar div/view/parent
  searchBarView: {
    borderColor: "black",
    borderBottomWidth: 3,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  // ***************************Styles for details page***************************
  // SafeAreaView
  mainDetails: {
    flex: 1,
    backgroundColor: "#B3001B",
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 3,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  // Image inside details screen
  pokemonImageDetails: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    resizeMode: "contain",
  },
  // Used for header, pokemon name
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
    overflow: "hidden",
    textAlign: "center",
  },
  // Used for all additional info that displays inside details, including imperial/metric switch text
  pokemonTextDetails: {
    fontSize: 32,
    color: "black",
    marginTop: 1,
    marginRight: 10,
    fontFamily: "VT323_400Regular",
    lineHeight: 40,
  },
  // Div/view that holds all PokemonTextDetails, including switch
  pokemonViewDetails: {
    width: windowWidth * 0.8,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    paddingBottom: 20,
    paddingLeft: 24,
    marginTop: 30,
    marginBottom: 30,
  },
  // Styling for icons that display next to pokemon type
  typeIcon: {
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
    resizeMode: "contain",
    marginTop: 10,
  },
  // Self explanatory, div/view that holds the switch with the text inside
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  // ***************************Styles for info page***************************
  // SafeAreaView
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
  // All hardcoded text in the screen
  infoText: {
    fontSize: 20,
    color: "black",
    marginVertical: 6,
  },
  // Styling for pokemon title image
  infoImage: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8 * (9 / 16),
    resizeMode: "contain",
  },
  // Styling for container that holds all hardcoded text
  infoView: {
    backgroundColor: "white",
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 3,
    marginBottom: 20,
    padding: 10,
    width: windowWidth * 0.9,
  },
});
