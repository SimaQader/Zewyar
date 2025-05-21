import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem}
        accessibilityLabel="Home"
        accessibilityRole="button"
      >
        <Ionicons name="home-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        accessibilityLabel="Donate"
        accessibilityRole="button"
      >
        <FontAwesome5 name="hand-holding-heart" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        accessibilityLabel="Organizations"
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="account-group-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        accessibilityLabel="Chat"
        accessibilityRole="button"
      >
        <Ionicons name="chatbox-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
    zIndex: 1,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigation; 