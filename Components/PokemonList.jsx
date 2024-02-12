import React, { useState, useEffect } from "react";
import { styles } from "../assets/CSS/styles.jsx";
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
  Animated,
  Dimensions,
} from "react-native";

// Main page of the application, shows a table of all pokemon and a search bar
export function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [slideInFromLeft] = useState(new Animated.Value(screenWidth));
  const [slideInFromRight] = useState(new Animated.Value(-screenWidth));

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [pokemonData]);

  useEffect(() => {
    slideInFromLeft.setValue(screenWidth); // Reset to initial value
    slideInFromRight.setValue(-screenWidth); // Reset to initial value

    Animated.parallel([
      Animated.spring(slideInFromLeft, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(slideInFromRight, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pokemonData]);

  useEffect(() => {
    if (!isSearchActive) {
      PokemonService.fetchPokemon(setPokemonData, offset, limit);
    }
  }, [offset, isSearchActive]);

  const handleRefresh = () => {
    setOffset(0);
    setPokemonData([]);
    setIsSearchActive(false);
    setTimeout(() => {
      PokemonService.fetchPokemon(setPokemonData, offset, limit);
    }, 100); // Delay of 100 miliseconds
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
            ).catch(handleRefresh);
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
      <Animated.View style={{ ...styles.main, opacity: fadeAnimation }}>
        <FlatList
          data={pokemonData}
          style={{ paddingTop: 20 }}
          initialNumToRender={8}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                ...styles.pokemonView,
                transform: [
                  {
                    translateX:
                      index % 2 === 0 ? slideInFromRight : slideInFromLeft,
                  },
                ],
              }}
            >
              <Pressable
                onPress={() => navigation.navigate("Pokemon Details", item)}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                />
                <Text style={styles.pokemonName}>{item.name}</Text>
              </Pressable>
            </Animated.View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          onEndReached={() => setOffset((prevOffset) => prevOffset + limit)}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
