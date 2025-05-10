import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const OrganizationDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { organization } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDonate = () => {
    navigation.navigate('Donation', { organizationId: organization.id });
  };

  const handleWebsite = () => {
    if (organization.website) {
      Linking.openURL(organization.website);
    }
  };

  const handleContact = () => {
    if (organization.email) {
      Linking.openURL(`mailto:${organization.email}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: organization.image || 'https://via.placeholder.com/400x200' }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{organization.name}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{organization.location || 'Location not specified'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.metaText}>{organization.members || '0'} members</Text>
            </View>
          </View>

          <Text style={styles.description}>{organization.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{organization.causes || 0}</Text>
              <Text style={styles.statLabel}>Causes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{organization.donations || 0}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{organization.impact || 0}</Text>
              <Text style={styles.statLabel}>Impact</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactInfo}>
            {organization.website && (
              <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
                <Ionicons name="globe-outline" size={20} color="#5993DE" />
                <Text style={styles.contactText}>{organization.website}</Text>
              </TouchableOpacity>
            )}
            {organization.email && (
              <TouchableOpacity style={styles.contactItem} onPress={handleContact}>
                <Ionicons name="mail-outline" size={20} color="#5993DE" />
                <Text style={styles.contactText}>{organization.email}</Text>
              </TouchableOpacity>
            )}
            {organization.phone && (
              <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`tel:${organization.phone}`)}>
                <Ionicons name="call-outline" size={20} color="#5993DE" />
                <Text style={styles.contactText}>{organization.phone}</Text>
              </TouchableOpacity>
            )}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5993DE',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5993DE',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    marginBottom: 20,
  },
  donateButton: {
    backgroundColor: '#5993DE',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactInfo: {
    marginTop: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  contactText: {
    fontSize: 16,
    color: '#5993DE',
    marginLeft: 12,
  },
});

export default OrganizationDetail; 