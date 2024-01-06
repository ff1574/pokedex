import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

// Stylesheet
export const styles = StyleSheet.create({
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
  },
  // Search bar div/view/parent
  searchBarView: {
    flexDirection: "row",
    gap: 15,
    padding: 15,
    borderColor: "black",
    borderBottomWidth: 3,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  // Search bar styling
  searchBar: {
    height: 60,
    width: windowWidth * 0.8 - 60,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontSize: 20,
  },
  // Search bar button styling
  searchBarButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 16,
    height: 60,
    width: 60,
  },
  // Search bar icon styling
  searchBarIcon: {
    color: "black",
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
