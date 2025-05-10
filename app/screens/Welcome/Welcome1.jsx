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

const WelcomeScreen1 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("Welcome2");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Hajiomaran.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Optional overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Welcome to Zewyar</Text>

          <Text style={styles.tagline}>
            Your Gateway to Environmental Impact
          </Text>

          <Text style={styles.bodyText}>
            Join us in making a difference. Together, we can create a
            sustainable future through collective action and meaningful
            contributions.
          </Text>

          {/* Swipe indicator */}
          <View style={styles.swipeIndicator}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Next button */}
          <View
            style={{ width: "100%", alignItems: "flex-end", marginTop: 30 }}
          >
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: "#2E7D32",
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 24,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
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

export default WelcomeScreen1;
