import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    heading: "Welcome to Zewyar",
    tagline: "Your Gateway to Environmental Impact",
    body: "Join us in making a difference. Together, we can create a sustainable future through collective action and meaningful contributions.",
    image: require("../../assets/Hajiomaran.png"),
    activeDot: 0,
  },
  {
    key: "2",
    heading: "Organization & Blog",
    tagline: "Connect and Share",
    body: "Discover organizations making a difference and share your environmental journey through our blog platform.",
    image: require("../../assets/Galisherana.png"),
    activeDot: 1,
  },
  {
    key: "3",
    heading: "Donation & Impact",
    tagline: "Make a Difference",
    body: "Support environmental causes through donations and track your impact on creating a sustainable future.",
    image: require("../../assets/Galisherana.png"),
    activeDot: 2,
  },
  {
    key: "4",
    heading: "Join the Movement",
    tagline: "Start Your Journey",
    body: "Be part of a community dedicated to positive environmental change. Sign up and make your impact today!",
    image: require("../../assets/Galisherana.png"),
    activeDot: 3,
  },
];

const Onboarding = () => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#000" }}
    >
      {slides.map((slide, idx) => (
        <ImageBackground
          key={slide.key}
          source={slide.image}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.contentContainer}>
            <Text style={styles.heading}>{slide.heading}</Text>
            <Text style={styles.tagline}>{slide.tagline}</Text>
            <Text style={styles.bodyText}>{slide.body}</Text>
            <View style={styles.swipeIndicator}>
              {[0, 1, 2, 3].map((dot, i) => (
                <View
                  key={i}
                  style={
                    i === slide.activeDot
                      ? [styles.dot, styles.activeDot]
                      : styles.dot
                  }
                />
              ))}
            </View>
          </View>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Onboarding;
