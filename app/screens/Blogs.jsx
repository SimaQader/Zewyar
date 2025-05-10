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

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogsData = await dataService.fetchBlogs();
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

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

  const renderBlogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate("BlogDetail", { blog: item })}
    >
      <Image source={{ uri: item.image }} style={styles.blogImage} />
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
            {item.views.toLocaleString()} views
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
    color: "#666",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: 44,
    paddingVertical: 8,
    fontFamily: "System",
  },
  blogList: {
    padding: 16,
  },
  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  blogImage: {
    width: "100%",
    height: 200,
  },
  blogContent: {
    padding: 16,
  },
  blogCategory: {
    fontSize: 12,
    color: "#1E5128",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    lineHeight: 24,
  },
  blogDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  blogMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  blogAuthor: {
    fontSize: 14,
    color: "#1E5128",
    fontWeight: "500",
  },
  blogDate: {
    fontSize: 12,
    color: "#666",
  },
  blogViews: {
    fontSize: 12,
    color: "#666",
  },
});

export default Blogs;
