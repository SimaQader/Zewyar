import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import dataService from "../services/dataService";
import BottomBar from "../components/BottomBar";

const bannerImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"; // Placeholder

const Home = () => {
  const navigation = useNavigation();
  const [causes, setCauses] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredCauses, setFilteredCauses] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [causesData, orgsData, blogsData] = await Promise.all([
          dataService.fetchCauses(),
          dataService.fetchOrganizations(),
          dataService.fetchBlogs(),
        ]);
        setCauses(causesData);
        setOrganizations(orgsData);
        setBlogs(blogsData);
        setFilteredCauses(causesData);
        setFilteredOrgs(orgsData);
        setFilteredBlogs(blogsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCauses(causes);
      setFilteredOrgs(organizations);
      setFilteredBlogs(blogs);
      return;
    }
    const q = search.toLowerCase();
    setFilteredCauses(causes.filter((c) => c.title?.toLowerCase().includes(q)));
    setFilteredOrgs(
      organizations.filter((o) => o.name?.toLowerCase().includes(q))
    );
    setFilteredBlogs(blogs.filter((b) => b.title?.toLowerCase().includes(q)));
  }, [search, causes, organizations, blogs]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#234B36" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DonationDetailScreen", { cause: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title || "Untitled"}</Text>
        <Text style={styles.cardAmount}>
          $ {item.raised?.toLocaleString() || "0"} raised
        </Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(
                  Math.round(((item.raised || 0) / (item.goal || 1)) * 100),
                  100
                )}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressPercent}>
          {Math.min(
            Math.round(((item.raised || 0) / (item.goal || 1)) * 100),
            100
          )}
          %
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Wavy Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerBg}>
            <Svg
              height="120"
              width="100%"
              viewBox="0 0 400 120"
              style={styles.headerSvg}
            >
              <Path d="M0,0 Q200,120 400,0 L400,0 L0,0 Z" fill="#D5DFDB" />
            </Svg>
            <View style={styles.headerContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                activeOpacity={0.7}
                style={{ flex: 1 }}
              >
                <Text style={styles.headerTitle}>Hello John!</Text>
                <Text style={styles.headerSubtitle}>
                  Small change, big difference!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={require("../assets/user.png")}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={{ marginLeft: 12, marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name="mic-outline"
              size={20}
              color="#999"
              style={{ marginRight: 12, marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerWrapper}>
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Make a Difference Today</Text>
            <Text style={styles.bannerSubtitle}>
              Join thousands of donors supporting worthy causes
            </Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => navigation.navigate("Donation")}
            >
              <Text style={styles.bannerButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Causes */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Featured Causes</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Donation")}>
            <Text style={styles.sectionSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.causeListContainer}
        >
          {filteredCauses.map((item) => renderItem({ item }))}
        </ScrollView>

        {/* Trusted Organizations */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Trusted Organizations</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Organizations")}
          >
            <Text style={styles.sectionSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.orgsContainer}
        >
          {filteredOrgs.map((org) => (
            <TouchableOpacity
              key={org.id}
              style={styles.orgItem}
              onPress={() =>
<<<<<<< HEAD
                navigation.navigate("Organizations", { organization: org })
=======
                navigation.navigate("OrganizationDetail", { organization: org })
>>>>>>> 296fdf8007ce082e0099a3185dacabd8e9baa5ff
              }
            >
              <Image source={org.logo} style={styles.orgLogo} />
              <Text style={styles.orgName}>{org.name}</Text>
              <Text style={styles.orgCategory}>{org.category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Blog Posts */}
        <View style={styles.sectionHeader}>
<<<<<<< HEAD
          <Text style={styles.sectionTitle}>      Recent Blog Posts</Text>
=======
          <Text style={styles.sectionTitle}>Recent Blog Posts</Text>
>>>>>>> 296fdf8007ce082e0099a3185dacabd8e9baa5ff
          <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.blogList}
        >
          {filteredBlogs.map((blog) => (
            <TouchableOpacity
              key={blog.id}
              style={styles.blogCard}
              onPress={() => navigation.navigate("BlogDetail", { blog })}
            >
              <Image source={{ uri: blog.image }} style={styles.blogImage} />
              <View style={styles.blogContent}>
                <Text style={styles.blogCategory}>{blog.category}</Text>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  {blog.title}
                </Text>
                <Text style={styles.blogDescription} numberOfLines={2}>
                  {blog.description}
                </Text>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogAuthor}>{blog.author}</Text>
                  <Text style={styles.blogDate}>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                  <Text style={styles.blogViews}>
                    {blog.views.toLocaleString()} views
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    backgroundColor: "transparent",
  },
  headerBg: {
    position: "relative",
    height: 120,
    backgroundColor: "transparent",
  },
  headerSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    position: "absolute",
    top: 30,
    left: 24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F5",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: -24,
    marginBottom: 20,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    height: 44,
  },
  bannerWrapper: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    height: 240,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35,75,54,0.35)",
  },
  bannerContent: {
    position: "absolute",
    left: 24,
    top: 32,
    right: 24,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  bannerButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#234B36",
    fontWeight: "bold",
    fontSize: 18,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  sectionSeeAll: {
    color: "#8CB4A0",
    fontWeight: "500",
    fontSize: 14,
  },
  causeListContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    width: 200,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
    height: 36,
  },
  cardAmount: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#1E5128",
    borderRadius: 4,
    shadowColor: "#1E5128",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  progressPercent: {
    textAlign: "right",
    color: "#1E5128",
    fontSize: 14,
    fontWeight: "600",
    paddingRight: 5,
  },
  orgsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  orgItem: {
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orgLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  orgName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E5128",
    textAlign: "center",
    marginBottom: 4,
  },
  orgCategory: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  blogList: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  blogCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  blogContent: {
    padding: 16,
  },
  blogCategory: {
    fontSize: 12,
    color: "#1E5128",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    lineHeight: 22,
  },
  blogDescription: {
    fontSize: 12,
    color: "#666",
  },
  blogMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  blogAuthor: {
    fontSize: 12,
    color: "#666",
  },
  blogDate: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  blogViews: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllButton: {
    color: "#1E5128",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Home;
