<<<<<<< HEAD
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
=======
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
>>>>>>> origin/main

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
<<<<<<< HEAD
      n;
=======
      navigation.replace('Welcome1');
>>>>>>> origin/main
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Center Section */}
      <View style={styles.centerSection}>
        {/* Logo */}
        <View style={styles.logoContainer}>
<<<<<<< HEAD
          <Image
            source={require("../assets/logo.png")} // Adjust if needed
=======
          <Image 
            source={require('../assets/logo.png')} // Adjust if needed
>>>>>>> origin/main
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Background Image */}
<<<<<<< HEAD
      <Image
        source={require("../assets/plant.png")} // Adjust if needed
=======
      <Image 
        source={require('../assets/plant.png')} // Adjust if needed
>>>>>>> origin/main
        style={styles.plantImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#F7F1ED",
    justifyContent: "space-between",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
=======
    backgroundColor: '#F7F1ED',
    justifyContent: 'space-between',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> origin/main
  },
  logoContainer: {
    width: 128,
    height: 400,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  logo: {
    width: "400",
    height: "70%",
  },
  plantImage: {
    height: "60%",
    width: "100%",
=======
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  logo: {
    width: '180',
    height: '70%',
  },
  plantImage: {
    height: '60%',
    width: '100%',
>>>>>>> origin/main
  },
});
