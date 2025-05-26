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
}

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
  };
const CreateBlogPost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    // You can add your blog post creation logic here
    alert('Blog post published!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
