import React, { useState, useEffect } from "react";
import { styles } from "../Assets/CSS/styles.jsx";
import PokemonService from "./PokemonService.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Button,
} from "react-native";

// Main page of the application, shows a table of all pokemon and a search bar
export function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (!isSearchActive) {
      PokemonService.fetchPokemon(setPokemonData, offset, limit);
    }
  }, [offset, isSearchActive]);

  const handleRefresh = () => {
    setOffset(0);
    setPokemonData([]);
    setIsSearchActive(false);
    PokemonService.fetchPokemon(setPokemonData, offset, limit);
  };

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
          onSubmitEditing={() => {
            setIsSearchActive(true);
            PokemonService.fetchSearchResults(
              searchText,
              setPokemonData,
              handleRefresh
            );
          }}
        />
        <Pressable
          style={styles.searchBarButton}
          onPress={() => {
            setIsSearchActive(true);
            PokemonService.fetchSearchResults(
              searchText,
              setPokemonData,
              handleRefresh
            );
          }}
        >
          <Icon
            style={styles.searchBarIcon}
            name="search"
            size={20}
            color="white"
          />
        </Pressable>
      </View>
      {/* List of all the pokemon, for every pokemon fetched, it creates a TouchableOpacity view with the pokemon name and image */}
      {/* When clicked, it goes to the pokemon details page associated with the ID, which fetches more information */}
      <FlatList
        data={pokemonData}
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
