<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Modal,
  Clipboard,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import dataService from "../services/dataService";
=======
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Modal, Clipboard, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
>>>>>>> origin/main

const DonationDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
<<<<<<< HEAD
  const { donation, cause } = route.params || {};

  // Use either donation or cause data (they're the same data from different screens)
  const data = donation || cause || {};

  // Use dynamic data with fallbacks
  const image =
    data?.image ||
    "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef";
  const title = data?.title || "Untitled Project";
  const goal = data?.goal || 0;
  const description = data?.description || "No description available.";
  const phone = data?.phone || "";
  const initialRaised = data?.raised || 0;

  // Campaign goal and progress tracking
  const [campaignGoal] = useState(goal);
  const [currentAmount, setCurrentAmount] = useState(initialRaised);
=======
  const { donation } = route.params || {};

  // Use dynamic data from donation or fallback to defaults
  const image = donation?.image || 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef';
  const title = donation?.title || 'Plant Tree for a School';
  const goal = donation?.amount || 600;
  const description = donation?.description || 'Help us plant trees for a greener school environment.';
  const phone = donation?.phone || '';
  const initialRaised = donation?.raised ;

  // Campaign goal and progress tracking
  const [campaignGoal] = useState(goal); // Use dynamic goal
  const [currentAmount, setCurrentAmount] = useState(initialRaised); // Use dynamic raised
>>>>>>> origin/main

  // Calculate progress percentage dynamically
  const [progressPercentage, setProgressPercentage] = useState(
    Math.min(Math.round((initialRaised / goal) * 100), 100)
  );
<<<<<<< HEAD

  // Animated value for progress bar
  const progressAnimation = useRef(
    new Animated.Value(Math.min((initialRaised / goal) * 100, 100))
  ).current;
=======
  
  // Animated value for progress bar
  const progressAnimation = useRef(new Animated.Value(
    Math.min((initialRaised / goal) * 100, 100)
  )).current;
>>>>>>> origin/main

  // Update animation when progressPercentage changes
  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progressPercentage,
      duration: 1000,
<<<<<<< HEAD
      useNativeDriver: false,
    }).start();
  }, [progressPercentage, progressAnimation]);

  const [selectedAmount, setSelectedAmount] = useState("15.00");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("Fast Pay");
=======
      useNativeDriver: false
    }).start();
  }, [progressPercentage, progressAnimation]);

  const [selectedAmount, setSelectedAmount] = useState('15.00');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Fast Pay');
>>>>>>> origin/main
  const [showQRCode, setShowQRCode] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Reset state when donation changes
  useEffect(() => {
    setCurrentAmount(initialRaised);
<<<<<<< HEAD
    const initialPercentage = Math.min(
      Math.round((initialRaised / goal) * 100),
      100
    );
    setProgressPercentage(initialPercentage);
    progressAnimation.setValue(initialPercentage);
    setCustomAmount("");
    setSelectedAmount("15.00");
  }, [data?.id, initialRaised, goal, progressAnimation]);
=======
    const initialPercentage = Math.min(Math.round((initialRaised / goal) * 100), 100);
    setProgressPercentage(initialPercentage);
    
    progressAnimation.setValue(initialPercentage); // Reset animation value directly
    
    setCustomAmount('');
    setSelectedAmount('15.00');
  }, [donation?.id, initialRaised, goal, progressAnimation]);
>>>>>>> origin/main

  // Your phone number for receiving donations
  const recipientPhoneNumber = phone; // Use dynamic phone

  // Final amount shown on donate button
  const donationAmount = customAmount ? customAmount : selectedAmount;

  // Generate payment data based on selected method and amount
  const getPaymentData = () => {
    const baseData = `AMOUNT:${donationAmount};PROJECT:${title};RECIPIENT:${recipientPhoneNumber};`;
<<<<<<< HEAD
    if (selectedMethod === "Fast Pay") {
=======
    if (selectedMethod === 'Fast Pay') {
>>>>>>> origin/main
      return `FASTPAY:${baseData}REF:FP${Date.now()}`;
    } else {
      return `FIB:${baseData}REF:FIB${Date.now()}`;
    }
  };

  // Copy number to clipboard
  const copyNumberToClipboard = () => {
    Clipboard.setString(recipientPhoneNumber);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Update progress when donation is made
<<<<<<< HEAD
  const processDonation = async () => {
    const donationValue = parseFloat(donationAmount || "0");
    const newTotal = currentAmount + donationValue;
    setCurrentAmount(newTotal);

    // Calculate and set new percentage
    const newPercentage = Math.min(
      Math.round((newTotal / campaignGoal) * 100),
      100
    );
    setProgressPercentage(newPercentage);

    // Animate the progress bar
    Animated.timing(progressAnimation, {
      toValue: newPercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Update the data in dataService
    await dataService.updateDonationProgress(data.id, newTotal, newPercentage);

    // Close modals
    setShowQRCode(false);
    setShowThankYou(true);

    // Reset donation amount
    setSelectedAmount("15.00");
    setCustomAmount("");
=======
  const processDonation = () => {
    const donationValue = parseFloat(donationAmount || '0');
    const newTotal = currentAmount + donationValue;
    setCurrentAmount(newTotal);
    
    // Calculate and set new percentage
    const newPercentage = Math.min(Math.round((newTotal / campaignGoal) * 100), 100);
    setProgressPercentage(newPercentage);
    
    // No need to animate here as useEffect will handle it when progressPercentage changes
    
    setShowQRCode(false);
    setShowThankYou(true);
>>>>>>> origin/main
  };

  // Format currency with commas for display
  const formatCurrency = (amount) => {
<<<<<<< HEAD
    return parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
=======
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
>>>>>>> origin/main
  };

  // QR Code Modal
  const renderQRCodeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQRCode}
        onRequestClose={() => setShowQRCode(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
<<<<<<< HEAD
            <TouchableOpacity
              style={styles.closeButton}
=======
            <TouchableOpacity 
              style={styles.closeButton} 
>>>>>>> origin/main
              onPress={() => setShowQRCode(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Scan to Donate</Text>
<<<<<<< HEAD
            <Text style={styles.modalSubtitle}>
              ${donationAmount} via {selectedMethod}
            </Text>
=======
            <Text style={styles.modalSubtitle}>${donationAmount} via {selectedMethod}</Text>
>>>>>>> origin/main
            <View style={styles.qrContainer}>
              <QRCode
                value={getPaymentData()}
                size={200}
<<<<<<< HEAD
                color={selectedMethod === "Fast Pay" ? "#E5225A" : "#009990"}
=======
                color={selectedMethod === 'Fast Pay' ? '#E5225A' : '#009990'}
>>>>>>> origin/main
              />
            </View>
            {/* Recipient Number Section */}
            <View style={styles.recipientNumberContainer}>
              <Text style={styles.recipientLabel}>Send to this number:</Text>
              <View style={styles.phoneNumberBox}>
                <Text style={styles.phoneNumber}>{recipientPhoneNumber}</Text>
<<<<<<< HEAD
                <TouchableOpacity
=======
                <TouchableOpacity 
>>>>>>> origin/main
                  style={styles.copyButton}
                  onPress={copyNumberToClipboard}
                >
                  <Ionicons name="copy-outline" size={20} color="#1E5128" />
                </TouchableOpacity>
              </View>
<<<<<<< HEAD
              {copySuccess && (
                <Text style={styles.copiedText}>Number copied!</Text>
              )}
            </View>
            <Text style={styles.qrInstructions}>
              Open your {selectedMethod} app and scan this code or send directly
              to the number above
            </Text>
            <TouchableOpacity
=======
              {copySuccess && <Text style={styles.copiedText}>Number copied!</Text>}
            </View>
            <Text style={styles.qrInstructions}>
              Open your {selectedMethod} app and scan this code or send directly to the number above
            </Text>
            <TouchableOpacity 
>>>>>>> origin/main
              style={styles.doneButton}
              onPress={processDonation}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Thank You Modal
  const renderThankYouModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showThankYou}
        onRequestClose={() => setShowThankYou(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.thankYouModalContent}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={50} color="#fff" />
            </View>
            <Text style={styles.thankYouTitle}>Thank You!</Text>
            <Text style={styles.thankYouMessage}>
              {`Your donation of $${donationAmount} will help: ${description}`}
            </Text>
            {/* Progress update message */}
            <View style={styles.progressUpdateContainer}>
              <Text style={styles.progressUpdateText}>
<<<<<<< HEAD
                Campaign Progress: ${formatCurrency(currentAmount)} of $
                {formatCurrency(campaignGoal)}
              </Text>
              <View style={styles.miniProgressBarBackground}>
                <Animated.View
                  style={[
                    styles.miniProgressBar,
                    {
                      width: progressAnimation.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              </View>
              <Text style={styles.miniProgressPercent}>
                {progressPercentage}% Complete
              </Text>
            </View>
            <TouchableOpacity
=======
                Campaign Progress: ${formatCurrency(currentAmount)} of ${formatCurrency(campaignGoal)}
              </Text>
              <View style={styles.miniProgressBarBackground}>
                <Animated.View 
                  style={[
                    styles.miniProgressBar, 
                    { 
                      width: progressAnimation.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                      }) 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.miniProgressPercent}>{progressPercentage}% Complete</Text>
            </View>
            <TouchableOpacity 
>>>>>>> origin/main
              style={styles.closeThankYouButton}
              onPress={() => setShowThankYou(false)}
            >
              <Text style={styles.closeThankYouButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity
=======
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity 
>>>>>>> origin/main
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.heroImage}
<<<<<<< HEAD
            resizeMode="cover"
=======
            resizeMode="contain"
>>>>>>> origin/main
          />
        </View>
        {/* Project Title */}
        <Text style={styles.projectTitle}>{title}</Text>
        {/* Donation Progress */}
        <View style={styles.donationInfoContainer}>
<<<<<<< HEAD
          <Text style={styles.donationAmount}>
            $ {formatCurrency(currentAmount)}
          </Text>
=======
          <Text style={styles.donationAmount}>$ {formatCurrency(currentAmount)}</Text>
>>>>>>> origin/main
          <View style={styles.timeLeftContainer}>
            <Ionicons name="time-outline" size={20} color="#A6C8A7" />
            <Text style={styles.timeLeft}>15 days left</Text>
          </View>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
<<<<<<< HEAD
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnimation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
=======
          <Animated.View 
            style={[
              styles.progressBar, 
              { 
                width: progressAnimation.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }) 
              }
            ]} 
>>>>>>> origin/main
          />
        </View>
        <Text style={styles.progressPercent}>{progressPercentage}%</Text>
        {/* Donation Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Donation amount</Text>
          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter the amount"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={customAmount}
<<<<<<< HEAD
              onChangeText={(text) => setCustomAmount(text)}
=======
              onChangeText={text => setCustomAmount(text)}
>>>>>>> origin/main
            />
          </View>
          {/* Quick Amount Selection */}
          <View style={styles.quickAmounts}>
<<<<<<< HEAD
            <TouchableOpacity
              style={[
                styles.amountOption,
                selectedAmount === "5.00" &&
                  !customAmount &&
                  styles.amountOptionSelected,
              ]}
              onPress={() => {
                setSelectedAmount("5.00");
                setCustomAmount("");
              }}
            >
              <Text style={styles.amountOptionText}>$ 5.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountOption,
                selectedAmount === "15.00" &&
                  !customAmount &&
                  styles.amountOptionSelected,
              ]}
              onPress={() => {
                setSelectedAmount("15.00");
                setCustomAmount("");
              }}
            >
              <Text style={styles.amountOptionText}>$ 15.00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.amountOption,
                selectedAmount === "25.00" &&
                  !customAmount &&
                  styles.amountOptionSelected,
              ]}
              onPress={() => {
                setSelectedAmount("25.00");
                setCustomAmount("");
              }}
=======
            <TouchableOpacity 
              style={[styles.amountOption, selectedAmount === '5.00' && !customAmount && styles.amountOptionSelected]}
              onPress={() => { setSelectedAmount('5.00'); setCustomAmount(''); }}
            >
              <Text style={styles.amountOptionText}>$ 5.00</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.amountOption, selectedAmount === '15.00' && !customAmount && styles.amountOptionSelected]}
              onPress={() => { setSelectedAmount('15.00'); setCustomAmount(''); }}
            >
              <Text style={styles.amountOptionText}>$ 15.00</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.amountOption, selectedAmount === '25.00' && !customAmount && styles.amountOptionSelected]}
              onPress={() => { setSelectedAmount('25.00'); setCustomAmount(''); }}
>>>>>>> origin/main
            >
              <Text style={styles.amountOptionText}>$ 25.00</Text>
            </TouchableOpacity>
          </View>
          {/* Payment Method */}
<<<<<<< HEAD
          <Text style={[styles.formLabel, { marginTop: 25 }]}>
            Select the Method
          </Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.methodOption,
                selectedMethod === "Fast Pay" && styles.fastPaySelected,
              ]}
              onPress={() => setSelectedMethod("Fast Pay")}
            >
              <Text
                style={[
                  styles.methodOptionText,
                  selectedMethod === "Fast Pay" &&
                    styles.methodOptionTextSelected,
                ]}
              >
                Fast Pay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodOption,
                selectedMethod === "FIB" && styles.fibSelected,
              ]}
              onPress={() => setSelectedMethod("FIB")}
            >
              <Text
                style={[
                  styles.methodOptionText,
                  selectedMethod === "FIB" && styles.methodOptionTextSelected,
                ]}
              >
                FIB
              </Text>
=======
          <Text style={[styles.formLabel, { marginTop: 25 }]}>Select the Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={[styles.methodOption, selectedMethod === 'Fast Pay' && styles.fastPaySelected]}
              onPress={() => setSelectedMethod('Fast Pay')}
            >
              <Text style={[styles.methodOptionText, selectedMethod === 'Fast Pay' && styles.methodOptionTextSelected]}>Fast Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.methodOption, selectedMethod === 'FIB' && styles.fibSelected]}
              onPress={() => setSelectedMethod('FIB')}
            >
              <Text style={[styles.methodOptionText, selectedMethod === 'FIB' && styles.methodOptionTextSelected]}>FIB</Text>
>>>>>>> origin/main
            </TouchableOpacity>
          </View>
          {/* Goal Information */}
          <View style={styles.goalInfoContainer}>
            <Text style={styles.goalInfoText}>
              Campaign Goal: ${formatCurrency(campaignGoal)}
            </Text>
          </View>
          {/* Payment method QR code preview (mini version) */}
          <View style={styles.previewQrSection}>
<<<<<<< HEAD
            <Text style={styles.previewQrText}>
              Payment will be processed via:
            </Text>
            <View
              style={[
                styles.previewQrContainer,
                selectedMethod === "Fast Pay"
                  ? styles.fastPayBorder
                  : styles.fibBorder,
              ]}
            >
              <View style={styles.miniQrCode}>
                <Ionicons
                  name="qr-code"
                  size={24}
                  color={selectedMethod === "Fast Pay" ? "#E5225A" : "#009990"}
=======
            <Text style={styles.previewQrText}>Payment will be processed via:</Text>
            <View style={[styles.previewQrContainer, selectedMethod === 'Fast Pay' ? styles.fastPayBorder : styles.fibBorder]}>
              <View style={styles.miniQrCode}>
                <Ionicons 
                  name="qr-code" 
                  size={24} 
                  color={selectedMethod === 'Fast Pay' ? '#E5225A' : '#009990'} 
>>>>>>> origin/main
                />
              </View>
              <Text style={styles.previewQrMethodText}>{selectedMethod}</Text>
            </View>
          </View>
        </View>
        {/* Donate Button */}
<<<<<<< HEAD
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => setShowQRCode(true)}
        >
          <Text style={styles.donateButtonText}>
            Donate ${donationAmount || "0.00"}
          </Text>
=======
        <TouchableOpacity 
          style={styles.donateButton}
          onPress={() => setShowQRCode(true)}
        >
          <Text style={styles.donateButtonText}>Donate ${donationAmount || '0.00'}</Text>
>>>>>>> origin/main
        </TouchableOpacity>
      </ScrollView>
      {/* Modals */}
      {renderQRCodeModal()}
      {renderThankYouModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
<<<<<<< HEAD
    backgroundColor: "#fff",
=======
    backgroundColor: '#fff',
>>>>>>> origin/main
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
<<<<<<< HEAD
    alignItems: "center",
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
=======
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width:'100%',
>>>>>>> origin/main
    height: 220,
  },
  projectTitle: {
    fontSize: 28,
<<<<<<< HEAD
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1A1A1A",
  },
  donationInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
=======
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  donationInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
>>>>>>> origin/main
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  donationAmount: {
    fontSize: 22,
<<<<<<< HEAD
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  timeLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeLeft: {
    color: "#A6C8A7",
    fontWeight: "500",
=======
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  timeLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLeft: {
    color: '#A6C8A7',
    fontWeight: '500',
>>>>>>> origin/main
    marginLeft: 5,
  },
  progressBarBackground: {
    height: 8,
<<<<<<< HEAD
    backgroundColor: "#E8E8E8",
=======
    backgroundColor: '#E8E8E8',
>>>>>>> origin/main
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
<<<<<<< HEAD
    backgroundColor: "#1E5128",
    borderRadius: 4,
    shadowColor: "#1E5128",
=======
    backgroundColor: '#1E5128',
    borderRadius: 4,
    shadowColor: '#1E5128',
>>>>>>> origin/main
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  progressPercent: {
<<<<<<< HEAD
    textAlign: "right",
    color: "#1E5128",
    fontSize: 14,
    fontWeight: "600",
    paddingRight: 5,
    marginBottom: 35,
=======
    textAlign: 'right',
    color: '#1E5128',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 35,
    paddingRight: 5,
>>>>>>> origin/main
  },
  formContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  formLabel: {
    fontSize: 18,
<<<<<<< HEAD
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1A1A1A",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
=======
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
>>>>>>> origin/main
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 20,
<<<<<<< HEAD
    color: "#333",
=======
    color: '#333',
>>>>>>> origin/main
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
<<<<<<< HEAD
    color: "#333",
  },
  quickAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountOption: {
    width: "30%",
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
  },
  amountOptionSelected: {
    backgroundColor: "#C1DCC2",
    borderColor: "#C1DCC2",
  },
  amountOptionText: {
    fontSize: 16,
    color: "#333",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  methodOption: {
    width: "48%",
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
  },
  fastPaySelected: {
    backgroundColor: "#E5225A",
    borderColor: "#E91E63",
  },
  fibSelected: {
    backgroundColor: "#009990",
    borderColor: "#00BCD4",
  },
  methodOptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  methodOptionTextSelected: {
    color: "#fff",
  },
  goalInfoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  goalInfoText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  previewQrSection: {
    marginTop: 25,
    alignItems: "center",
  },
  previewQrText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  previewQrContainer: {
    flexDirection: "row",
    alignItems: "center",
=======
    color: '#333',
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountOption: {
    width: '30%',
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  amountOptionSelected: {
    backgroundColor: '#C1DCC2',
    borderColor: '#C1DCC2',
  },
  amountOptionText: {
    fontSize: 16,
    color: '#333',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  methodOption: {
    width: '48%',
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  fastPaySelected: {
    backgroundColor: '#E5225A',
    borderColor: '#E91E63',
  },
  fibSelected: {
    backgroundColor: '#009990',
    borderColor: '#00BCD4',
  },
  methodOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  methodOptionTextSelected: {
    color: '#fff',
  },
  goalInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  goalInfoText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  previewQrSection: {
    marginTop: 25,
    alignItems: 'center',
  },
  previewQrText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  previewQrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> origin/main
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  fastPayBorder: {
<<<<<<< HEAD
    borderColor: "#E5225A",
  },
  fibBorder: {
    borderColor: "#009990",
=======
    borderColor: '#E5225A',
  },
  fibBorder: {
    borderColor: '#009990',
>>>>>>> origin/main
  },
  miniQrCode: {
    marginRight: 10,
  },
  previewQrMethodText: {
    fontSize: 16,
<<<<<<< HEAD
    fontWeight: "500",
  },
  donateButton: {
    backgroundColor: "#1E5128",
    borderRadius: 8,
    padding: 18,
    alignItems: "center",
=======
    fontWeight: '500',
  },
  donateButton: {
    backgroundColor: '#1E5128',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
>>>>>>> origin/main
    marginTop: 30,
    marginHorizontal: 5,
  },
  donateButtonText: {
<<<<<<< HEAD
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
=======
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
>>>>>>> origin/main
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
=======
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
>>>>>>> origin/main
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
<<<<<<< HEAD
    position: "absolute",
=======
    position: 'absolute',
>>>>>>> origin/main
    top: 10,
    right: 10,
    padding: 5,
  },
  modalTitle: {
    fontSize: 24,
<<<<<<< HEAD
    fontWeight: "bold",
=======
    fontWeight: 'bold',
>>>>>>> origin/main
    marginTop: 10,
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 18,
<<<<<<< HEAD
    color: "#666",
=======
    color: '#666',
>>>>>>> origin/main
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
<<<<<<< HEAD
    backgroundColor: "#f9f9f9",
=======
    backgroundColor: '#f9f9f9',
>>>>>>> origin/main
    borderRadius: 12,
    marginBottom: 20,
  },
  // Recipient number styles
  recipientNumberContainer: {
<<<<<<< HEAD
    width: "100%",
    alignItems: "center",
=======
    width: '100%',
    alignItems: 'center',
>>>>>>> origin/main
    marginBottom: 15,
  },
  recipientLabel: {
    fontSize: 14,
<<<<<<< HEAD
    color: "#666",
    marginBottom: 8,
  },
  phoneNumberBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
    width: "80%",
    justifyContent: "space-between",
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
=======
    color: '#666',
    marginBottom: 8,
  },
  phoneNumberBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    width: '80%',
    justifyContent: 'space-between',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
>>>>>>> origin/main
  },
  copyButton: {
    padding: 5,
  },
  copiedText: {
<<<<<<< HEAD
    color: "#4CAF50",
=======
    color: '#4CAF50',
>>>>>>> origin/main
    fontSize: 12,
    marginTop: 5,
  },
  qrInstructions: {
<<<<<<< HEAD
    textAlign: "center",
    color: "#666",
=======
    textAlign: 'center',
    color: '#666',
>>>>>>> origin/main
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  doneButton: {
<<<<<<< HEAD
    backgroundColor: "#1E5128",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Thank you modal
  thankYouModalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
=======
    backgroundColor: '#1E5128',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Thank you modal
  thankYouModalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
>>>>>>> origin/main
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
<<<<<<< HEAD
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
=======
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
>>>>>>> origin/main
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 28,
<<<<<<< HEAD
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1E5128",
  },
  thankYouMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
=======
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E5128',
  },
  thankYouMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
>>>>>>> origin/main
    marginBottom: 25,
  },
  // Progress update in thank you modal
  progressUpdateContainer: {
<<<<<<< HEAD
    width: "100%",
    backgroundColor: "#f5f5f5",
=======
    width: '100%',
    backgroundColor: '#f5f5f5',
>>>>>>> origin/main
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  progressUpdateText: {
    fontSize: 14,
<<<<<<< HEAD
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  miniProgressBarBackground: {
    height: 6,
    backgroundColor: "#E8E8E8",
=======
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  miniProgressBarBackground: {
    height: 6,
    backgroundColor: '#E8E8E8',
>>>>>>> origin/main
    borderRadius: 3,
    marginBottom: 4,
  },
  miniProgressBar: {
    height: 6,
<<<<<<< HEAD
    backgroundColor: "#1E5128",
    borderRadius: 3,
    shadowColor: "#1E5128",
=======
    backgroundColor: '#1E5128',
    borderRadius: 3,
    shadowColor: '#1E5128',
>>>>>>> origin/main
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  miniProgressPercent: {
<<<<<<< HEAD
    textAlign: "right",
    color: "#1E5128",
    fontSize: 14,
    fontWeight: "600",
    paddingRight: 5,
  },
  closeThankYouButton: {
    backgroundColor: "#1E5128",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  closeThankYouButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DonationDetailScreen;
=======
    textAlign: 'right',
    color: '#1E5128',
    fontSize: 14,
    fontWeight: '600',
    paddingRight: 5,
  },
  closeThankYouButton: {
    backgroundColor: '#1E5128',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeThankYouButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DonationDetailScreen;
>>>>>>> origin/main
