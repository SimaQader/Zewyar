// src/screens/auth/VerifyEmailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { navigate, reset } from "../navigation/navigation";
import {
  getAuth,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { auth } from "../firebase"; // Assuming your firebase auth instance is exported as 'auth' from firebase.js

const VerifyEmailScreen = ({ route }) => {
  const authentication = getAuth(auth.app); // Use the auth instance from firebase.js
  const email = route?.params?.email || 'example@gmail.com';
  
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendActive, setResendActive] = useState(false);
  
  // Check email verification status periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      const user = authentication.currentUser;
      if (user) {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(interval);
          reset({ index: 0, routes: [{ name: 'Home' }] });
        }
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval); // Cleanup interval
  }, [authentication]);

  // Timer for resend code functionality
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendActive(true);
    }
  }, [timer]);

  const handleResendCode = async () => {
    if (resendActive) {
      try {
        setTimer(60);
        setResendActive(false);
        setError('');
        const user = authentication.currentUser;
        if (user) {
          await sendEmailVerification(user);
          console.log('Verification email sent again!');
        } else {
          setError('No active user found. Please try signing up or logging in again.');
        }
      } catch (error) {
        console.error('Error resending verification email:', error);
        let errorMessage = 'Failed to resend verification email. Please try again.';
        if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many requests. Please wait a moment before trying to resend.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found. Please sign up.';
        }
        setError(errorMessage);
      }
    }
  };

  const handleSignUp = () => {
    navigate('SignUp');
  };

  const handleLogin = () => {
    navigate('LogIn');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Verify Your Email</Text>
        
        <Text style={styles.subtitle}>
          We've sent a verification email to {email}. Please check your inbox and click the verification link.
        </Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity 
          style={styles.resendContainer}
          onPress={handleResendCode}
          disabled={!resendActive}
        >
          <Text style={[
            styles.resendText, 
            !resendActive && styles.resendTextDisabled
          ]}>
            {resendActive ? 'Resend Email' : `Resend Email (${timer}s)`}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.changeEmailContainer}
          onPress={handleSignUp}
        >
          <Text style={styles.changeEmailText}>Back to Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backToLoginContainer}
          onPress={handleLogin}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 400,
    height: 200,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b4332',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resendContainer: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  resendText: {
    fontSize: 16,
    color: '#1b4332',
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: '#999',
  },
  doneButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1b4332',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeEmailContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  changeEmailText: {
    fontSize: 16,
    color: '#333',
    textDecorationLine: 'underline',
  },
  backToLoginContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  backToLoginText: {
    fontSize: 16,
    color: '#1b4332',
    textDecorationLine: 'underline',
  },
});

export default VerifyEmailScreen;