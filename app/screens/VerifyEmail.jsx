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
} from 'react-native';
import { navigate, reset } from '../navigation/navigation';

const VerifyEmailScreen = ({ route }) => {
  // Set a default email and safely access route params if they exist
  const email = route?.params?.email || 'example@gmail.com';
  
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendActive, setResendActive] = useState(false);
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Timer for resend code functionality
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendActive(true);
    }
  }, [timer]);

  const handleCodeChange = (text, index) => {
    // Only allow digits
    if (/^\d*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      
      // Auto-advance to next input
      if (text.length === 1 && index < 3 && inputRefs[index + 1]?.current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0 && inputRefs[index - 1]?.current) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendCode = () => {
    if (resendActive) {
      // Reset timer and code
      setTimer(60);
      setResendActive(false);
      setCode(['', '', '', '']);
      setError('');
      
      // Here you would call your API to resend the code
      console.log('Resending code to', email);
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      setError('Please enter all 4 digits of the code');
      return;
    }
    
    // Here you would verify the code with your backend
    if (fullCode === '1234') { // Replace with actual verification
      reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setError('Invalid verification code. Please try again.');
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
          Please enter 4 digit code sent to {'\n'}{email}
        </Text>
        
        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.codeInput}
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>
        
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
            {resendActive ? 'Resend Code' : `Resend Code (${timer}s)`}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={handleVerify}
        >
          <Text style={styles.doneButtonText}>Done</Text>
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