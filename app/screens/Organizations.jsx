<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";
import dataService from "../services/dataService";

// Main component
const Organizations = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgsData = await dataService.fetchOrganizations();
        setOrganizations(orgsData);
      } catch (error) {
        console.error("Error loading organizations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrganizations();
  }, []);

  // Filter organizations based on search and category
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || org.tags.includes(selectedCategory);
=======
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  SafeAreaView,
  ScrollView,
  Linking 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';

// Sample data for organizations
const SAMPLE_ORGANIZATIONS = [
  {
    id: '1',
    name: 'Hasar Organization',
    category: 'Environment',
    date: 'Jan 3, 2022',
    views: 3344,
    logo: require('../assets/Hasar.png'),
    tags: ['Environment', 'None profit', 'International'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta.'
  },
  {
    id: '2',
    name: 'Rwanga Organization',
    category: 'General',
    date: 'Jan 1, 2022',
    views: 9823,
    logo: require('../assets/Rwanga.png'),
    tags: ['Environmental', 'Local'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta. Lorem adipiscing mus vestibulum consequat porta eu ultrices feugiat. Et, faucibus ut amet turpis. Facilisis faucibus semper cras purus.',
    website: 'https://www.rwanga.org/'
  },
  {
    id: '3',
    name: 'Pekawa',
    category: 'Environment',
    date: 'Feb 12, 2022',
    views: 5621,
    logo: require('../assets/Pekawa.png'),
    tags: ['Enviorment', 'Local', 'None profit'],
    description: 'Working to create sustainable solutions for environmental challenges worldwide.'
  },
  {
    id: '4',
    name: 'UNICEF',
    category: 'Intenational',
    date: 'Mar 5, 2022',
    views: 2187,
    logo: require('../assets/UNICEF.png'),
    tags: ['Intenational', 'None profit'],
    description: 'Supporting local communities through education and infrastructure development.'
  },
  {
    id: '5',
    name: 'Friends of the Earth International',
    category: 'Environment',
    date: 'Jan 15, 2022',
    views: 7432,
    logo: require('../assets/Friends_of_the_Earth.png'),
    tags: ['Technology', 'International'],
    description: 'Bringing technology education and resources to underserved communities.'
  },
  {
    id: '6',
    name: '350.org',
    category: 'Environment',
    date: 'Feb 20, 2022',
    views: 4125,
    logo: require('../assets/350.png'),
    tags: ['Health', 'International', 'None profit'],
    description: 'Improving healthcare access in developing regions through innovative solutions.'
  },
  {
    id: '7',
    name: 'World Wide Fund for Nature',
    category: 'Environment',
    date: 'Mar 10, 2022',
    views: 3089,
    logo: require('../assets/WWF.png'),
    tags: ['Environment', 'Local'],
    description: 'Creating sustainable urban planning solutions for growing cities.'
  },
  {
    id: '8',
    name: 'ForHopeProject',
    category: 'Environment',
    date: 'Jan 25, 2022',
    views: 6234,
    logo: require('../assets/fhp.png'),
    tags: ['Project', 'Enviroment', 'None profit'],
    description: 'Advocating for digital rights and privacy in the modern age.'
  },
  {
    id: '9',
    name: 'Yak Dar',
    category: 'Environment',
    date: 'Feb 8, 2022',
    views: 4785,
    logo: require('../assets/YakDar.png'),
    tags: ['Education', 'None profit', 'Local'],
    description: 'Providing educational opportunities for underprivileged youth.'
  },
  {
    id: '10',
    name: 'UN Climate Change',
    category: 'Environment',
    date: 'Mar 18, 2022',
    views: 5127,
    logo: require('../assets/United_Nations_Climate_Change.png'),
    tags: ['Environment', 'International', 'None profit'],
    description: 'Developing sustainable solutions for clean water access globally.'
  }
];

// Main component
const Organizations = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Filter organizations based on search and category
  const filteredOrganizations = SAMPLE_ORGANIZATIONS.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || org.tags.includes(selectedCategory);
>>>>>>> origin/main
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
<<<<<<< HEAD
  const categories = [
    "All",
    "Environment",
    "None profit",
    "Local",
    "International",
    "Technology",
    "Education",
    "Health",
  ];

  // Render organization list
  const renderOrganizationItem = ({ item }) => (
    <TouchableOpacity
=======
  const categories = ['All', 'Environment', 'None profit', 'Local', 'International', 'Technology', 'Education', 'Health'];

  // Render organization list
  const renderOrganizationItem = ({ item }) => (
    <TouchableOpacity 
>>>>>>> origin/main
      style={styles.orgListItem}
      onPress={() => setSelectedOrganization(item)}
    >
      <View style={styles.logoContainer}>
        <Image source={item.logo} style={styles.orgListLogo} />
      </View>
      <View style={styles.orgListContent}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.orgName}>{item.name}</Text>
<<<<<<< HEAD
        <Text style={styles.orgMeta}>
          {item.date} • {item.views} views
        </Text>
=======
        <Text style={styles.orgMeta}>{item.date} • {item.views} views</Text>
>>>>>>> origin/main
      </View>
    </TouchableOpacity>
  );

  // Recommended organizations section (top 2)
<<<<<<< HEAD
  const recommendedOrgs = organizations.slice(0, 2);

  // Render recommended card
  const renderRecommendedCard = (item, index) => (
    <TouchableOpacity
=======
  const recommendedOrgs = SAMPLE_ORGANIZATIONS.slice(0, 2);

  // Render recommended card
  const renderRecommendedCard = (item, index) => (
    <TouchableOpacity 
>>>>>>> origin/main
      key={item.id}
      style={[styles.recommendedCard, { marginRight: index === 0 ? 10 : 0 }]}
      onPress={() => setSelectedOrganization(item)}
    >
      <View style={styles.recommendedLogoContainer}>
        <Image source={item.logo} style={styles.recommendedLogo} />
      </View>
      <Text style={styles.recommendedTitle}>{item.name}</Text>
      <Text style={styles.recommendedMeta}>{item.category}</Text>
    </TouchableOpacity>
  );

  // Organization detail screen
  const OrganizationDetail = ({ organization, onBack }) => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
<<<<<<< HEAD
          <Feather
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
=======
          <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
>>>>>>> origin/main
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.detailContainer}>
        <View style={styles.detailLogoContainer}>
          <Image source={organization.logo} style={styles.detailLogo} />
        </View>
<<<<<<< HEAD

        <View style={styles.tagContainer}>
          {organization.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
          <Text style={styles.metaText}>
            {organization.date} • {organization.views} views
          </Text>
        </View>

        <Text style={styles.detailTitle}>{organization.name}</Text>

        <Text style={styles.detailDescription}>{organization.description}</Text>
        <Text style={styles.detailDescription}>{organization.description}</Text>
        <Text style={styles.detailDescription}>{organization.description}</Text>

        {organization.website && (
          <TouchableOpacity
=======
        
        <View style={styles.tagContainer}>
          {organization.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>{tag}</Text>
          ))}
          <Text style={styles.metaText}>{organization.date} • {organization.views} views</Text>
        </View>
        
        <Text style={styles.detailTitle}>{organization.name}</Text>
        
        <Text style={styles.detailDescription}>{organization.description}</Text>
        <Text style={styles.detailDescription}>{organization.description}</Text>
        <Text style={styles.detailDescription}>{organization.description}</Text>
        
        {organization.website && (
          <TouchableOpacity 
>>>>>>> origin/main
            style={styles.websiteLink}
            onPress={() => Linking.openURL(organization.website)}
          >
            <Feather name="globe" size={16} color="black" />
            <Text style={styles.websiteText}>{organization.website}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
<<<<<<< HEAD

=======
      
>>>>>>> origin/main
      <BottomBar />
    </SafeAreaView>
  );

  // Main home screen
  const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
<<<<<<< HEAD
          <Feather
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
=======
          <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
>>>>>>> origin/main
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Recommended</Text>
<<<<<<< HEAD

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendedScroll}
        >
          {recommendedOrgs.map((item, index) =>
            renderRecommendedCard(item, index)
          )}
        </ScrollView>

        <View style={styles.divider} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category ? styles.categorySelected : null,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category
                    ? styles.categoryTextSelected
                    : null,
=======
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedScroll}>
          {recommendedOrgs.map((item, index) => renderRecommendedCard(item, index))}
        </ScrollView>
        
        <View style={styles.divider} />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.categoryButton, 
                selectedCategory === category ? styles.categorySelected : null
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText, 
                  selectedCategory === category ? styles.categoryTextSelected : null
>>>>>>> origin/main
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
<<<<<<< HEAD

        <FlatList
          data={filteredOrganizations}
          renderItem={renderOrganizationItem}
          keyExtractor={(item) => item.id}
=======
        
        <FlatList
          data={filteredOrganizations}
          renderItem={renderOrganizationItem}
          keyExtractor={item => item.id}
>>>>>>> origin/main
          scrollEnabled={false}
          style={styles.orgList}
        />
      </ScrollView>
<<<<<<< HEAD

=======
      
>>>>>>> origin/main
      <BottomBar />
    </SafeAreaView>
  );

  return (
    <>
      {selectedOrganization ? (
<<<<<<< HEAD
        <OrganizationDetail
          organization={selectedOrganization}
          onBack={() => setSelectedOrganization(null)}
=======
        <OrganizationDetail 
          organization={selectedOrganization} 
          onBack={() => setSelectedOrganization(null)} 
>>>>>>> origin/main
        />
      ) : (
        <HomeScreen />
      )}
    </>
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
  scrollContent: {
    flex: 1,
  },
  header: {
<<<<<<< HEAD
    flexDirection: "row",
    alignItems: "center",
=======
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> origin/main
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
<<<<<<< HEAD
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
=======
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
>>>>>>> origin/main
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 24,
<<<<<<< HEAD
    fontWeight: "bold",
=======
    fontWeight: 'bold',
>>>>>>> origin/main
    marginVertical: 16,
    marginHorizontal: 16,
  },
  recommendedScroll: {
    paddingHorizontal: 16,
  },
  recommendedCard: {
    width: 150,
<<<<<<< HEAD
    alignItems: "center",
=======
    alignItems: 'center',
>>>>>>> origin/main
  },
  recommendedLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
<<<<<<< HEAD
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  recommendedMeta: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
=======
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  recommendedMeta: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
>>>>>>> origin/main
    marginVertical: 16,
    marginHorizontal: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
<<<<<<< HEAD
    backgroundColor: "#f0f0f0",
  },
  categorySelected: {
    backgroundColor: "#1e5b2c",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  categoryTextSelected: {
    color: "#fff",
=======
    backgroundColor: '#f0f0f0',
  },
  categorySelected: {
    backgroundColor: '#1e5b2c',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
>>>>>>> origin/main
  },
  orgList: {
    paddingHorizontal: 16,
    marginBottom: 60, // Add bottom margin to make space for BottomBar
  },
  orgListItem: {
<<<<<<< HEAD
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
=======
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
>>>>>>> origin/main
  },
  orgListLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
<<<<<<< HEAD
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
=======
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
>>>>>>> origin/main
  },
  orgListContent: {
    flex: 1,
  },
  category: {
    fontSize: 12,
<<<<<<< HEAD
    color: "gray",
  },
  orgName: {
    fontSize: 16,
    fontWeight: "500",
=======
    color: 'gray',
  },
  orgName: {
    fontSize: 16,
    fontWeight: '500',
>>>>>>> origin/main
    marginVertical: 2,
  },
  orgMeta: {
    fontSize: 12,
<<<<<<< HEAD
    color: "gray",
=======
    color: 'gray',
>>>>>>> origin/main
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 60, // Add bottom margin to make space for BottomBar
  },
  detailLogo: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 16,
<<<<<<< HEAD
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
=======
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
>>>>>>> origin/main
    marginBottom: 16,
  },
  tag: {
    fontSize: 12,
<<<<<<< HEAD
    backgroundColor: "#f0f0f0",
=======
    backgroundColor: '#f0f0f0',
>>>>>>> origin/main
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
<<<<<<< HEAD
    color: "gray",
=======
    color: 'gray',
>>>>>>> origin/main
    marginLeft: 4,
  },
  detailTitle: {
    fontSize: 22,
<<<<<<< HEAD
    fontWeight: "bold",
=======
    fontWeight: 'bold',
>>>>>>> origin/main
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
<<<<<<< HEAD
    color: "#333",
    marginBottom: 16,
  },
  websiteLink: {
    flexDirection: "row",
    alignItems: "center",
=======
    color: '#333',
    marginBottom: 16,
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> origin/main
    marginTop: 8,
  },
  websiteText: {
    fontSize: 14,
<<<<<<< HEAD
    color: "#0066cc",
    marginLeft: 8,
    textDecorationLine: "underline",
=======
    color: '#0066cc',
    marginLeft: 8,
    textDecorationLine: 'underline',
>>>>>>> origin/main
  },
  logoContainer: {
    width: 85,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
<<<<<<< HEAD
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
=======
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
>>>>>>> origin/main
  },
  recommendedLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
<<<<<<< HEAD
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
=======
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
>>>>>>> origin/main
  },
  detailLogoContainer: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 16,
<<<<<<< HEAD
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default Organizations;
=======
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default Organizations;
>>>>>>> origin/main
