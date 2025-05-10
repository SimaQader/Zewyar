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
