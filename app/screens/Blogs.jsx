import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";
import dataService from "../services/dataService";

const Blogs = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await dataService.fetchBlogs();
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    
    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadBlogs(); // Reload blogs when screen is focused
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredBlogs(filtered);
  }, [search, selectedCategory, blogs]);

  const categories = [
    "All",
    "Climate Action",
    "SDG Goals",
    "Sustainability",
    "Clean Energy",
    "Urban Sustainability",
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    loadBlogs();
  };

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate("BlogDetail", { blog: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.blogImage} 
        defaultSource={require('../assets/Ranya.png')}
      />
      <View style={styles.blogContent}>
        <Text style={styles.blogCategory}>{item.category}</Text>
        <Text style={styles.blogTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.blogDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.blogMeta}>
          <Text style={styles.blogAuthor}>{item.author}</Text>
          <Text style={styles.blogDate}>
            {new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </Text>
          <Text style={styles.blogViews}>
            {item.views?.toLocaleString() || "0"} views
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#1e5b2c" />
      ) : (
        <>
          <Feather name="file-text" size={50} color="#cccccc" />
          <Text style={styles.emptyText}>No blogs found</Text>
          {search || selectedCategory !== "All" ? (
            <Text style={styles.emptySubText}>
              Try adjusting your search or filters
            </Text>
          ) : (
            <TouchableOpacity
              style={styles.createFirstButton}
              onPress={() => navigation.navigate("CreateBlog")}
            >
              <Text style={styles.createFirstButtonText}>Create Your First Blog</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );

  return (
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
            placeholder="Search blogs..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateBlog')}
        >
          <Feather name="plus" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 10, paddingLeft: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor:
                  selectedCategory === category ? "#1e5b2c" : "#f0f0f0",
              }}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: selectedCategory === category ? "#fff" : "#333",
                  textAlign: "center",
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredBlogs}
        renderItem={renderBlogItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.blogList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e5b2c",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  blogList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  blogCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  blogImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 12,
  },
  blogContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
    paddingRight: 12,
  },
  blogCategory: {
    fontSize: 12,
    color: "#1E5128",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  blogDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
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
});

export default Blogs;