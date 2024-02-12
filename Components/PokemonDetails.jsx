import React, { useState } from "react";
import { styles } from "../assets/CSS/styles.jsx";
import { typeImages } from "./TypeImages.jsx";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  Switch,
} from "react-native";

// When clicked on pokemon, this page shows with more details
export function PokemonDetails({ route }) {
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
        <Image
          source={{ uri: img }}
          style={styles.pokemonImageDetails}
          resizeMode="contain"
        />
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
              <Image
                source={getTypeImage(item)}
                style={styles.typeIcon}
                resizeMode="contain"
              />
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
