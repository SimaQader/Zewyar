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

const WelcomeScreen2 = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("Welcome3");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Ranya.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Optional overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Organization & Blog</Text>

          <Text style={styles.tagline}>Connect and Share</Text>

          <Text style={styles.bodyText}>
            Discover organizations making a difference and share your
            environmental journey through our blog platform.
          </Text>

          {/* Swipe indicator */}
          <View style={styles.swipeIndicator}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

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
=======
import React from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  StyleSheet, 
  Dimensions, 
  Platform, 
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const WelcomeScreen2 = () => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const handleNext = () => {
    navigation.navigate('Welcome3');
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX < -50) {
        translateX.value = withSpring(-Dimensions.get('window').width, {
          damping: 20,
          stiffness: 90,
        });
        runOnJS(handleNext)();
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <ImageBackground
            source={require('../../assets/Galisherana.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Optional overlay */}
            <View style={styles.overlay} />

            {/* Content */}
            <View style={styles.contentContainer}>
              <Text style={styles.heading}>Organization & Blog</Text>

              <Text style={styles.tagline}>Connect and Share</Text>

              <Text style={styles.bodyText}>
                Discover organizations making a difference and share your environmental journey through our blog platform.
              </Text>

              {/* Swipe indicator */}
              <View style={styles.swipeIndicator}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      </PanGestureHandler>
>>>>>>> origin/main
    </View>
  );
};

<<<<<<< HEAD
const { width, height } = Dimensions.get("window");
=======
const { width, height } = Dimensions.get('window');
>>>>>>> origin/main

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#000",
=======
    backgroundColor: '#000',
>>>>>>> origin/main
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
<<<<<<< HEAD
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
=======
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 8, 8, 0.5)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
>>>>>>> origin/main
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 32,
<<<<<<< HEAD
    fontWeight: "bold",
    color: "#ffffff",
=======
    fontWeight: 'bold',
    color: '#ffffff',
>>>>>>> origin/main
    marginBottom: 14,
  },
  tagline: {
    fontSize: 20,
<<<<<<< HEAD
    fontWeight: "600",
    color: "#e0f2f1",
=======
    fontWeight: '600',
    color: '#e0f2f1',
>>>>>>> origin/main
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 18,
<<<<<<< HEAD
    color: "#f5f5f5",
=======
    color: '#f5f5f5',
>>>>>>> origin/main
    lineHeight: 28,
    marginBottom: 40,
  },
  swipeIndicator: {
<<<<<<< HEAD
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
=======
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
>>>>>>> origin/main
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
<<<<<<< HEAD
    backgroundColor: "#a5d6a7",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2E7D32",
    width: 20,
  },
=======
    backgroundColor: '#a5d6a7',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
    width: 20,
  }
>>>>>>> origin/main
});

export default WelcomeScreen2;
