<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import dataService from "../services/dataService";

const CreateBlog = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    "Climate Action",
    "SDG Goals",
    "Sustainability",
    "Clean Energy",
    "Urban Sustainability",
  ];

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "You need to allow access to your photos to upload an image.");
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Information", "Please enter a title for your blog post.");
      return;
    }
    
    if (!category) {
      Alert.alert("Missing Information", "Please select a category for your blog post.");
      return;
    }
    
    if (!content.trim()) {
      Alert.alert("Missing Information", "Please enter content for your blog post.");
      return;
    }
    
    if (!image) {
      Alert.alert("Missing Information", "Please upload a featured image for your blog post.");
      return;
    }

    try {
      setIsUploading(true);
      
      // Create the new blog object
      const newBlog = {
        title,
        category,
        description: content.substring(0, 120) + "...", // First 120 chars as description
        content,
        image,
        author: "You", // Could be replaced with actual user info
        date: new Date().toISOString(),
        views: 0,
      };
      
      // Upload the blog post
      await dataService.createBlog(newBlog);
      
      setIsUploading(false);
      Alert.alert(
        "Success", 
        "Your blog post has been published successfully!", 
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setIsUploading(false);
      console.error("Error publishing blog:", error);
      Alert.alert("Error", "Failed to publish your blog post. Please try again.");
    }
=======
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateBlogPost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    // You can add your blog post creation logic here
    alert('Blog post published!');
    navigation.goBack();
>>>>>>> 296fdf8007ce082e0099a3185dacabd8e9baa5ff
  };

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="#1e5b2c" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create New Post</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a captivating title"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />

            <Text style={styles.label}>Featured Image</Text>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Feather name="upload" size={32} color="#c0c0c0" />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text style={category ? styles.dropdownText : styles.dropdownPlaceholder}>
                {category || "Select category"}
              </Text>
              <Feather name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View style={styles.dropdownList}>
                {categories.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory(item);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Content</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Write your blog content here..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.publishButton}
              onPress={handlePublish}
              disabled={isUploading}
            >
              <Text style={styles.publishButtonText}>
                {isUploading ? "Publishing..." : "Publish Now"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
=======
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Create New Post</Text>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a captivating title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Select category"
          value={category}
          onChangeText={setCategory}
        />
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
          placeholder="Write your blog content here..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handlePublish}>
          <Text style={styles.buttonText}>Publish Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
>>>>>>> 296fdf8007ce082e0099a3185dacabd8e9baa5ff
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e5b2c",
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  imageUpload: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  uploadPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    color: "#888",
    fontSize: 14,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 200,
  },
  publishButton: {
    backgroundColor: "#1e5b2c",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateBlog;
=======
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '500', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f5f5f5' },
  button: { backgroundColor: '#234B36', borderRadius: 8, padding: 16, marginTop: 24, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  backButton: { marginTop: 16, alignSelf: 'center', padding: 10 },
  backButtonText: { color: '#234B36', fontWeight: 'bold' },
});

export default CreateBlogPost;
>>>>>>> 296fdf8007ce082e0099a3185dacabd8e9baa5ff
