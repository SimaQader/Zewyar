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
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
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
      style={styles.orgListItem}
      onPress={() => setSelectedOrganization(item)}
    >
      <View style={styles.logoContainer}>
        <Image source={item.logo} style={styles.orgListLogo} />
      </View>
      <View style={styles.orgListContent}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.orgName}>{item.name}</Text>
        <Text style={styles.orgMeta}>
          {item.date} • {item.views} views
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Recommended organizations section (top 2)
  const recommendedOrgs = organizations.slice(0, 2);

  // Render recommended card
  const renderRecommendedCard = (item, index) => (
    <TouchableOpacity
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
          <Feather
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
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
            style={styles.websiteLink}
            onPress={() => Linking.openURL(organization.website)}
          >
            <Feather name="globe" size={16} color="black" />
            <Text style={styles.websiteText}>{organization.website}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );

  // Main home screen
  const HomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
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
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredOrganizations}
          renderItem={renderOrganizationItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.orgList}
        />
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );

  return (
    <>
      {selectedOrganization ? (
        <OrganizationDetail
          organization={selectedOrganization}
          onBack={() => setSelectedOrganization(null)}
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
    backgroundColor: "#fff",
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    fontWeight: "bold",
    marginVertical: 16,
    marginHorizontal: 16,
  },
  recommendedScroll: {
    paddingHorizontal: 16,
  },
  recommendedCard: {
    width: 150,
    alignItems: "center",
  },
  recommendedLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
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
  },
  orgList: {
    paddingHorizontal: 16,
    marginBottom: 60, // Add bottom margin to make space for BottomBar
  },
  orgListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orgListLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  orgListContent: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: "gray",
  },
  orgName: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 2,
  },
  orgMeta: {
    fontSize: 12,
    color: "gray",
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
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    fontSize: 12,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  websiteLink: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  websiteText: {
    fontSize: 14,
    color: "#0066cc",
    marginLeft: 8,
    textDecorationLine: "underline",
  },
  logoContainer: {
    width: 85,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  recommendedLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  detailLogoContainer: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default Organizations;
