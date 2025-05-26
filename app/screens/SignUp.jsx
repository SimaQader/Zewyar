import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { navigate } from "../navigation/navigation";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const { db } = require('../firebase'); // Assuming 'db' is exported from your firebase.js

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      setError(''); // Clear previous errors

      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      navigate("VerifyEmail", { email });

      // Send email verification
      try {
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser);
          Alert.alert("Verification Email Sent", "Please check your email to verify your account.");
        } else {
          // This case should ideally not happen after successful user creation
          console.error("No user is currently logged in after sign up.");
          Alert.alert("Sign Up Error", "User not found after creation. Please try logging in.");
        }
      } catch (verificationError) {
        console.error("Error sending verification email:", verificationError);
        // Handle specific verification email errors if needed
        Alert.alert("Verification Email Error", "Failed to send verification email. Please try again later.");
      }

      // Add user data to Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email: user.email,
        });
      } catch (firestoreError) {
        console.error("Error adding user data to Firestore:", firestoreError);
        Alert.alert("Database Error", "Failed to save user data. Please contact support.");
        // Consider rolling back user creation or handling this case appropriately
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogin = () => {
    navigation.reset({
      index: 0,
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
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>
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
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#ccc"
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
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#ccc"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            disabled={loading}
          >
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
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2c4836",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
    position: "relative",
    marginHorizontal: 50,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  signUpButton: {
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
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
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
    borderRadius: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  socialText: {
    color: "#333",
  },
});

export default SignUpScreen;
