<<<<<<< HEAD
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
=======
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
>>>>>>> origin/main
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
<<<<<<< HEAD
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import {
=======
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { 
>>>>>>> origin/main
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
<<<<<<< HEAD
  onAuthStateChanged,
} from "firebase/auth";
import { navigate } from "../navigation/navigation";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
=======
  onAuthStateChanged
} from 'firebase/auth';
import { navigate } from '../navigation/navigation';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
>>>>>>> origin/main
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
<<<<<<< HEAD
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("VerifyEmail", { email });
    } catch (error) {
      Alert.alert("Error", error.message);
=======
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('VerifyEmail', { email });
    } catch (error) {
      Alert.alert('Error', error.message);
>>>>>>> origin/main
    }
  };

  const handleLogin = () => {
    navigation.reset({
      index: 0,
<<<<<<< HEAD
      routes: [{ name: "LogIn" }],
    });
  };
  const handleLoadingScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoadingScreen" }],
    });
  };

  const handleLinkedInSignup = () => {
    navigation.reset({ index: 0, routes: [{ name: "LoadingScreen" }] });
    setTimeout(() => {
      navigation.replace("Welcome1");
      setTimeout(() => {
        navigation.replace("Welcome2");
        setTimeout(() => {
          navigation.replace("Welcome3");
          setTimeout(() => {
            navigation.replace("Welcome4");
            setTimeout(() => {
              navigation.replace("SignUp");
            }, 8000);
          }, 8000);
        }, 8000);
      }, 8000);
    }, 8000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
=======
      routes: [{ name: 'LogIn' }],
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>>>>>>> origin/main
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
<<<<<<< HEAD

=======
          
>>>>>>> origin/main
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              placeholderTextColor="#ccc"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              placeholderTextColor="#ccc"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#ccc"
            />
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#ccc"
=======
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={24} 
                color="#ccc" 
>>>>>>> origin/main
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#ccc"
            />
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#ccc"
=======
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye" : "eye-off"} 
                size={24} 
                color="#ccc" 
>>>>>>> origin/main
              />
            </TouchableOpacity>
          </View>

<<<<<<< HEAD
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
=======
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
>>>>>>> origin/main
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.socialTitle}>Sign up with</Text>

          <View style={styles.socialContainer}>
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleLinkedInSignup}
            >
              <Image
                source={require("../assets/linkedin.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../assets/google.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../assets/facebook.png")}
                style={styles.socialIcon}
=======
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../assets/linkedin.png')} 
                style={styles.socialIcon} 
              />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../assets/google.png')} 
                style={styles.socialIcon} 
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../assets/facebook.png')} 
                style={styles.socialIcon} 
>>>>>>> origin/main
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#fff",
=======
    backgroundColor: '#fff',
>>>>>>> origin/main
  },
  content: {
    flex: 1,
    padding: 20,
<<<<<<< HEAD
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2c4836",
    textAlign: "center",
=======
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2c4836',
    textAlign: 'center',
>>>>>>> origin/main
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
<<<<<<< HEAD
    position: "relative",
    marginHorizontal: 50,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
=======
    position: 'relative',
    marginHorizontal: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
>>>>>>> origin/main
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
<<<<<<< HEAD
    position: "absolute",
=======
    position: 'absolute',
>>>>>>> origin/main
    right: 15,
    top: 15,
  },
  signUpButton: {
<<<<<<< HEAD
    backgroundColor: "#2c4836",
    borderRadius: 5,
    padding: 15,
    margin: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#333",
  },
  loginLink: {
    color: "#2c4836",
    fontWeight: "500",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
=======
    backgroundColor: '#2c4836',
    borderRadius: 5,
    padding: 15,
    margin: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#2c4836',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> origin/main
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
<<<<<<< HEAD
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  socialTitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
=======
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialTitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
>>>>>>> origin/main
    borderRadius: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  socialText: {
<<<<<<< HEAD
    color: "#333",
  },
});

export default SignUpScreen;
=======
    color: '#333',
  },
});

export default SignUpScreen;
>>>>>>> origin/main
