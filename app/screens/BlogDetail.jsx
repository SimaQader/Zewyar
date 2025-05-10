import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const BlogDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { blog } = route.params || {};

  if (!blog) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No blog data provided.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {blog.image && (
          <Image source={{ uri: blog.image }} style={styles.image} />
        )}
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.meta}>{blog.date} · {blog.views} views</Text>
        <Text style={styles.body}>{blog.content || blog.description || ''}</Text>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  meta: { fontSize: 14, color: '#888', marginBottom: 16 },
  body: { fontSize: 16, color: '#333', lineHeight: 22 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 40 },
  backButton: { margin: 20, alignSelf: 'center', padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  backButtonText: { color: '#234B36', fontWeight: 'bold' },
});

export default BlogDetail; 