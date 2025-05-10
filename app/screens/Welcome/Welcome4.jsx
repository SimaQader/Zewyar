<<<<<<< HEAD
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen4 = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("SignUp");
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Galisherana.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Join the Movement</Text>
          <Text style={styles.tagline}>Start Your Journey</Text>
          <Text style={styles.bodyText}>
            Be part of a community dedicated to positive environmental change.
            Sign up and make your impact today!
          </Text>
          <View style={styles.swipeIndicator}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
          <View
            style={{ width: "100%", alignItems: "flex-end", marginTop: 30 }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{
                backgroundColor: "#2E7D32",
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 24,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
=======
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { navigate } from '../../navigation/navigation';

const Welcome4 = () => {
  const handleGetStarted = () => {
    navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Rawandz.png')} style={styles.image} />
      <Text style={styles.title}>Ready to Make a Difference?</Text>
      <Text style={styles.subtitle}>Join our community of changemakers and start making an impact today</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
>>>>>>> origin/main
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 8, 8, 0.5)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 14,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#e0f2f1",
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 18,
    color: "#f5f5f5",
    lineHeight: 28,
    marginBottom: 40,
  },
  swipeIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#a5d6a7",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2E7D32",
    width: 20,
  },
});

export default WelcomeScreen4;
=======
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5993DE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome4;
>>>>>>> origin/main
