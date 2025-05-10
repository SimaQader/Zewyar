import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";

const BlogDetail = ({ route, navigation }) => {
  const { blog } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Image source={{ uri: blog.image }} style={styles.headerImage} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Category and Date */}
          <View style={styles.metaContainer}>
            <Text style={styles.category}>{blog.category}</Text>
            <Text style={styles.date}>
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{blog.title}</Text>

          {/* Author and Views */}
          <View style={styles.authorContainer}>
            <Text style={styles.author}>By {blog.author}</Text>
            <Text style={styles.views}>
              {blog.views.toLocaleString()} views
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{blog.description}</Text>

          {/* Content */}
          <Text style={styles.content}>{blog.content}</Text>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share-2" size={20} color="#1E5128" />
            <Text style={styles.shareText}>Share Article</Text>
          </TouchableOpacity>
        </View>
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
  headerImage: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  category: {
    fontSize: 14,
    color: "#1E5128",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
    lineHeight: 32,
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  author: {
    fontSize: 16,
    color: "#1E5128",
    fontWeight: "500",
  },
  views: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    marginBottom: 24,
    fontStyle: "italic",
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 26,
    marginBottom: 30,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  shareText: {
    fontSize: 16,
    color: "#1E5128",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default BlogDetail;
