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
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const WelcomeScreen3 = ({ navigation }) => {
  const translateX = useSharedValue(0);

  const handleNext = () => {
    navigation.navigate('Welcome4');
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
              <Text style={styles.heading}>Donation & Impact</Text>

              <Text style={styles.tagline}>Make a Difference</Text>

              <Text style={styles.bodyText}>
                Support environmental causes through donations and track your impact on creating a sustainable future.
              </Text>

              {/* Swipe indicator */}
              <View style={styles.swipeIndicator}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 14,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e0f2f1',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 18,
    color: '#f5f5f5',
    lineHeight: 28,
    marginBottom: 40,
  },
  swipeIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a5d6a7',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
    width: 20,
  }
});

export default WelcomeScreen3;
