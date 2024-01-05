import React, { useState, useEffect } from "react";
import { styles } from "../Assets/CSS/styles.jsx";
import PokemonService from "./PokemonService.jsx";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from "react-native";

// Main page of the application, shows a table of all pokemon and a search bar
export function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    loadPokemon();
  }, [offset]);

  const loadPokemon = () => {
    PokemonService.fetchPokemon(setPokemonData, offset, limit);
  };

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
          <Pressable
            style={styles.pokemonView}
            onPress={() => navigation.navigate("Pokemon Details", item)}
          >
            <Image
              source={{ uri: item.img }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
            <Text style={styles.pokemonName}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={() => setOffset((prevOffset) => prevOffset + limit)}
        onEndReachedThreshold={1.5}
      />
    </SafeAreaView>
  );
}
