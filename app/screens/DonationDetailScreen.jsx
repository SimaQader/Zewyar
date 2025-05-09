import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Modal, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg'; // You'll need to install this package
import { useNavigation } from '@react-navigation/native';

const DonationDetailScreen = () => {
  const navigation = useNavigation();

  // Your phone number for receiving donations
  const recipientPhoneNumber = ""; // Replace with your actual number
  
  // Campaign goal and progress tracking
  const [campaignGoal] = useState(600); // Total campaign goal in dollars
  const [currentAmount, setCurrentAmount] = useState(190); // Current amount raised
  const [progressPercentage, setProgressPercentage] = useState(30); // Initial progress percentage
  
  const [selectedAmount, setSelectedAmount] = useState('15.00');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('Fast Pay');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Final amount shown on donate button
  const donationAmount = customAmount ? customAmount : selectedAmount;

  // Generate payment data based on selected method and amount
  const getPaymentData = () => {
    const baseData = `AMOUNT:${donationAmount};PROJECT:Plant Tree for a School;RECIPIENT:${recipientPhoneNumber};`;
    
    if (selectedMethod === 'Fast Pay') {
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
  const processDonation = () => {
    // Parse donation amount to float
    const donationValue = parseFloat(donationAmount);
    
    // Update current amount raised
    const newTotal = currentAmount + donationValue;
    setCurrentAmount(newTotal);
    
    // Calculate and update progress percentage
    const newPercentage = Math.min(Math.round((newTotal / campaignGoal) * 100), 100);
    setProgressPercentage(newPercentage);
    
    // Close QR code modal and show thank you modal
    setShowQRCode(false);
    setShowThankYou(true);
  };

  // Format currency with commas for display
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowQRCode(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Scan to Donate</Text>
            <Text style={styles.modalSubtitle}>${donationAmount} via {selectedMethod}</Text>
            
            <View style={styles.qrContainer}>
              <QRCode
                value={getPaymentData()}
                size={200}
                color={selectedMethod === 'Fast Pay' ? '#E5225A' : '#009990'}
              />
            </View>
            
            {/* Recipient Number Section */}
            <View style={styles.recipientNumberContainer}>
              <Text style={styles.recipientLabel}>Send to this number:</Text>
              <View style={styles.phoneNumberBox}>
                <Text style={styles.phoneNumber}>{recipientPhoneNumber}</Text>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={copyNumberToClipboard}
                >
                  <Ionicons name="copy-outline" size={20} color="#1E5128" />
                </TouchableOpacity>
              </View>
              {copySuccess && <Text style={styles.copiedText}>Number copied!</Text>}
            </View>
            
            <Text style={styles.qrInstructions}>
              Open your {selectedMethod} app and scan this code or send directly to the number above
            </Text>
            
            <TouchableOpacity 
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
              Your donation of ${donationAmount} will help plant trees at a school.
              Together we're making the world greener!
            </Text>
            
            {/* Progress update message */}
            <View style={styles.progressUpdateContainer}>
              <Text style={styles.progressUpdateText}>
                Campaign Progress: ${formatCurrency(currentAmount)} of ${formatCurrency(campaignGoal)}
              </Text>
              <View style={styles.miniProgressBarBackground}>
                <View style={[styles.miniProgressBar, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.miniProgressPercent}>{progressPercentage}% Complete</Text>
            </View>
            
            <TouchableOpacity 
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button - FIXED HERE */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef' }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Project Title */}
        <Text style={styles.projectTitle}>Plant Tree for a School</Text>

        {/* Donation Progress */}
        <View style={styles.donationInfoContainer}>
          <Text style={styles.donationAmount}>$ {formatCurrency(currentAmount)}</Text>
          <View style={styles.timeLeftContainer}>
            <Ionicons name="time-outline" size={20} color="#A6C8A7" />
            <Text style={styles.timeLeft}>15 days left</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
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
              onChangeText={text => setCustomAmount(text)}
            />
          </View>

          {/* Quick Amount Selection */}
          <View style={styles.quickAmounts}>
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
            >
              <Text style={styles.amountOptionText}>$ 25.00</Text>
            </TouchableOpacity>
          </View>

          {/* Payment Method */}
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
            <Text style={styles.previewQrText}>Payment will be processed via:</Text>
            <View style={[styles.previewQrContainer, selectedMethod === 'Fast Pay' ? styles.fastPayBorder : styles.fibBorder]}>
              <View style={styles.miniQrCode}>
                {/* Mini QR icon preview */}
                <Ionicons 
                  name="qr-code" 
                  size={24} 
                  color={selectedMethod === 'Fast Pay' ? '#E5225A' : '#009990'} 
                />
              </View>
              <Text style={styles.previewQrMethodText}>{selectedMethod}</Text>
            </View>
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity 
          style={styles.donateButton}
          onPress={() => setShowQRCode(true)}
        >
          <Text style={styles.donateButtonText}>Donate ${donationAmount || '0.00'}</Text>
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
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: 220,
    height: 220,
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  donationInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  donationAmount: {
    fontSize: 22,
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
    marginLeft: 5,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1E5128',
    borderRadius: 4,
  },
  progressPercent: {
    textAlign: 'right',
    color: '#666',
    fontSize: 12,
    marginBottom: 35,
    paddingRight: 5,
  },
  formContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 20,
    color: '#333',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  fastPayBorder: {
    borderColor: '#E5225A',
  },
  fibBorder: {
    borderColor: '#009990',
  },
  miniQrCode: {
    marginRight: 10,
  },
  previewQrMethodText: {
    fontSize: 16,
    fontWeight: '500',
  },
  donateButton: {
    backgroundColor: '#1E5128',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 5,
  },
  donateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 20,
  },
  // Recipient number styles
  recipientNumberContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  recipientLabel: {
    fontSize: 14,
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
  },
  copyButton: {
    padding: 5,
  },
  copiedText: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 5,
  },
  qrInstructions: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  doneButton: {
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
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E5128',
  },
  thankYouMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  // Progress update in thank you modal
  progressUpdateContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  progressUpdateText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  miniProgressBarBackground: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    marginBottom: 4,
  },
  miniProgressBar: {
    height: 6,
    backgroundColor: '#1E5128',
    borderRadius: 3,
  },
  miniProgressPercent: {
    textAlign: 'right',
    color: '#666',
    fontSize: 12,
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