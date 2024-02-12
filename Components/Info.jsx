import React from "react";
import { styles } from "../assets/CSS/styles.jsx";
import { SafeAreaView, Text, View, Image, ScrollView } from "react-native";

// Info page with hardcoded information
export function Info() {
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
            source={require("../assets/pokemon-title.png")}
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
