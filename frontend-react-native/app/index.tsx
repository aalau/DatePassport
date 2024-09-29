import { Platform, StyleSheet, Text, View, Button, Vibration } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import BigButton from "../components/BigButton"
import SearchBar from "../components/SearchBar"
import * as firebase from "@react-native-firebase/app";
import Login from './Login'


export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Date Passport</Text>
        <Text style={styles.subtitle}>Where are you going for your next date?</Text>
        <Login/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 32,
    color: "#38434D",
  },
});

const handlePress = () => {
    Vibration.vibrate(50); // Vibrate for 50ms when pressed
};

