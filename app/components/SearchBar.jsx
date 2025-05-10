import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
      <TextInput 
        style={styles.searchInput}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel="Search input"
        accessibilityRole="search"
      />
      <Ionicons name="mic" size={20} color="#777" style={styles.micIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  micIcon: {
    marginLeft: 10,
  },
});

export default SearchBar; 