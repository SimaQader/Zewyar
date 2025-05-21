import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={28} color={current === 'Home' ? '#234B36' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Donation')}>
        <FontAwesome5 name="hand-holding-heart" size={26} color={current === 'Donation' ? '#234B36' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Organizations')}>
        <MaterialCommunityIcons name="account-group-outline" size={28} color={current === 'Organizations' ? '#234B36' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Blogs')}>
        <Ionicons name="newspaper-outline" size={28} color={current === 'Blogs' ? '#234B36' : '#B0B0B0'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default BottomBar; 