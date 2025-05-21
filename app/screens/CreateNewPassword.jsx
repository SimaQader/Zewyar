import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';


const CreateNewPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleDone = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
    } else if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
    } else {
      setError('');
      // Here you would typically update the password in your backend
      navigation.navigate('LogIn', { 
        message: 'Password successfully updated. Please login with your new password.' 
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subtitle}>Please enter your new password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={newPassword}
        onChangeText={text => {
          setNewPassword(text);
          if (error) setError('');
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          if (error) setError('');
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('LogIn')}
      >
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F6', // soft white background
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B3D2F', // dark greenish color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  input: {
    width: '85%',
    height: 50,
    borderColor: '#1B3D2F',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    
  },
  button: {
    backgroundColor: '#1B3D2F', // dark green
    width: '85%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#1B3D2F',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
