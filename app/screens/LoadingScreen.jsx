import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoadingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      n;
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Center Section */}
      <View style={styles.centerSection}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")} // Adjust if needed
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Background Image */}
      <Image
        source={require("../assets/plant.png")} // Adjust if needed
        style={styles.plantImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1ED",
    justifyContent: "space-between",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 128,
    height: 400,
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
  },
});
