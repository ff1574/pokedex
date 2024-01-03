// Imports
import React from "react";
import { Stack, Tab } from "./Components/Navigation";
import { Info } from "./Components/Info.jsx";
import { PokemonList } from "./Components/PokemonList.jsx";
import { PokemonDetails } from "./Components/PokemonDetails.jsx";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";

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
