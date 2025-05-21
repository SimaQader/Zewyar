import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView,
  Pressable
} from 'react-native';

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: 'your name',
    email: 'yourname@gmail.com',
    mobile: 'Add number',
    location: 'USA'
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSave = () => {
    console.log('Saving profile data:', formData);
    // Implementation for saving data would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {/* Header with close button */}
          <View style={styles.header}>
            <View style={styles.profileHeaderContainer}>
              <View style={styles.profileHeader}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} 
                  style={styles.profileImage} 
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Your name</Text>
                  <Text style={styles.profileEmail}>yourname@gmail.com</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email account</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mobile number</Text>
            <TextInput
              style={styles.input}
              value={formData.mobile}
              onChangeText={(text) => handleChange('mobile', text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => handleChange('location', text)}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Change</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#4A6D52',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width:200,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  }
});

export default ProfileScreen;