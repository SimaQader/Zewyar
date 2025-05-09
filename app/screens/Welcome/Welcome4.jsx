import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { navigate } from '../../navigation/navigation';

const Welcome4 = () => {
  const handleGetStarted = () => {
    navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Rawandz.png')} style={styles.image} />
      <Text style={styles.title}>Ready to Make a Difference?</Text>
      <Text style={styles.subtitle}>Join our community of changemakers and start making an impact today</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#5993DE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome4;
