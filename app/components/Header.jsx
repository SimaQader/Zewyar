import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGES } from '../constants/images';

const Header = ({ onProfilePress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Hello John!</Text>
        <Text style={styles.headerSubtitle}>Small change, big difference!</Text>
      </View>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={onProfilePress}
        accessibilityLabel="Profile menu"
        accessibilityRole="button"
      >
        <Image 
          source={require('../assets/user.png')} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#D5DFDB',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});

export default Header; 