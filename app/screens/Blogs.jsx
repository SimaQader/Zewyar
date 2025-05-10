import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';

// Dummy blog data
const DUMMY_BLOGS = [
  {
    id: '1',
    title: 'The Future of Sustainability',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2024-06-01',
    views: 123,
    description: 'Exploring the latest trends and innovations in sustainability for a better tomorrow.'
  },
  {
    id: '2',
    title: 'How to Make a Difference',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2024-05-28',
    views: 98,
    description: 'Simple steps everyone can take to help the environment and their community.'
  },
  {
    id: '3',
    title: 'Community Projects That Inspire',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2024-05-20',
    views: 76,
    description: 'A look at some of the most inspiring community projects around the world.'
  }
];

const Blogs = () => {
  const navigation = useNavigation();
  const [blogs] = useState(DUMMY_BLOGS);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BlogDetail', { blog: item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.date} · {item.views} views</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Blogs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateBlogPost')} style={styles.addButton}>
          <Ionicons name="add" size={32} color="#234B36" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subheading}>Let's learn together!</Text>
      <FlatList
        data={blogs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  heading: { fontSize: 32, fontWeight: 'bold' },
  addButton: { padding: 4 },
  subheading: { fontSize: 16, color: '#333', marginLeft: 20, marginBottom: 10 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  image: { width: 100, height: 100, borderRadius: 12 },
  cardContent: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 12, color: '#888', marginBottom: 6 },
  description: { fontSize: 14, color: '#333' },
});

export default Blogs;
