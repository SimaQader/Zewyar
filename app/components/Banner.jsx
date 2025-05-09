import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGES } from '../constants/images';

const Banner = ({ onDonatePress }) => {
  return (
    <View style={styles.bannerContainer}>
      <ImageBackground 
        source={{ uri: IMAGES.BANNER }} 
        style={styles.bannerImage}
        imageStyle={styles.bannerImageStyle}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Make a Difference Today</Text>
          <Text style={styles.bannerSubtitle}>Join thousands of donors supporting worthy causes</Text>
          
          <TouchableOpacity 
            style={styles.donateButton}
            onPress={onDonatePress}
            accessibilityLabel="Donate now button"
            accessibilityRole="button"
          >
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    margin: 20,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerImageStyle: {
    borderRadius: 20,
  },
  bannerOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    marginBottom: 15,
  },
  donateButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  donateButtonText: {
    color: '#184E39',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Banner; 