import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image, ActivityIndicator, TextInput, FlatList, Keyboard } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import dataService from '../services/dataService';
import BottomBar from '../components/BottomBar';
const profileImage = 'https://randomuser.me/api/portraits/men/32.jpg'; // Placeholder
const bannerImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'; // Placeholder

const Home = () => {
  const navigation = useNavigation();
  const [causes, setCauses] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredCauses, setFilteredCauses] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [causesData, orgsData, blogsData] = await Promise.all([
          dataService.fetchCauses(),
          dataService.fetchOrganizations(),
          dataService.fetchBlogs()
        ]);
        setCauses(causesData);
        setOrganizations(orgsData);
        setBlogs(blogsData);
        setFilteredCauses(causesData);
        setFilteredOrgs(orgsData);
        setFilteredBlogs(blogsData);
      } catch (error) {
        console.error('Error loading data:', error);
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
    setFilteredCauses(causes.filter(c => c.title?.toLowerCase().includes(q)));
    setFilteredOrgs(organizations.filter(o => o.name?.toLowerCase().includes(q)));
    setFilteredBlogs(blogs.filter(b => b.title?.toLowerCase().includes(q)));
  }, [search, causes, organizations, blogs]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#234B36" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Wavy Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerBg}>
            <Svg height="120" width="100%" viewBox="0 0 400 120" style={styles.headerSvg}>
              <Path d="M0,0 Q200,120 400,0 L400,0 L0,0 Z" fill="#D5DFDB" />
            </Svg>
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} activeOpacity={0.7} style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Hello John!</Text>
                <Text style={styles.headerSubtitle}>Small change, big difference!</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search" size={20} color="#999" style={{ marginLeft: 12, marginRight: 8 }} />
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
            <Ionicons name="mic-outline" size={20} color="#999" style={{ marginRight: 12, marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerWrapper}>
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Make a Difference Today</Text>
            <Text style={styles.bannerSubtitle}>Join thousands of donors supporting worthy causes</Text>
            <TouchableOpacity style={styles.bannerButton} onPress={() => navigation.navigate('Donation')}>
              <Text style={styles.bannerButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Causes */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Featured Causes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Donation')}><Text style={styles.sectionSeeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          data={filteredCauses}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.causeCard} onPress={() => navigation.navigate('CauseDetail', { cause: item })}>
              <Image source={{ uri: item.image }} style={styles.causeImage} />
              <Text style={styles.causeTitle}>{item.title}</Text>
              <Text style={styles.causeRaised}>${item.raised} raised of ${item.goal}</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${Math.min(100, (item.raised / item.goal) * 100)}%` }]} />
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Trusted Organizations */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Trusted organization</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Organizations')}><Text style={styles.sectionSeeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, alignItems: 'center' }}>
          {filteredOrgs.slice(0, 2).map(org => (
            <TouchableOpacity key={org.id} style={styles.orgCircleWrapper} onPress={() => navigation.navigate('OrganizationDetail', { organization: org })}>
              <Image source={{ uri: org.image }} style={styles.orgCircle} />
              <Text style={styles.orgCircleText}>{org.name}</Text>
            </TouchableOpacity>
          ))}
          {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.orgCirclePlaceholder} />
          ))}
        </ScrollView>

        {/* Recent Blog Posts */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Recent Blog Posts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Blogs')}><Text style={styles.sectionSeeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          data={filteredBlogs}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8, marginBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.causeCard} onPress={() => navigation.navigate('BlogDetail', { blog: item })}>
              <Image source={{ uri: item.image }} style={styles.causeImage} />
              <Text style={styles.causeTitle}>{item.title}</Text>
              <Text style={styles.causeRaised}>{item.date} · {item.views} views</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerWrapper: { backgroundColor: 'transparent' },
  headerBg: { position: 'relative', height: 120, backgroundColor: 'transparent' },
  headerSvg: { position: 'absolute', top: 0, left: 0, right: 0 },
  headerContent: { position: 'absolute', top: 30, left: 24, right: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#111' },
  headerSubtitle: { fontSize: 16, color: '#333', marginTop: 4 },
  profileImage: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: '#fff', backgroundColor: '#eee' },
  searchBarWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7F5', borderRadius: 16, marginHorizontal: 20, marginTop: -24, marginBottom: 20, height: 44 },
  searchInput: { flex: 1, fontSize: 16, color: '#222' },
  bannerWrapper: { marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', marginBottom: 24, height: 240, position: 'relative' },
  bannerImage: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(35,75,54,0.35)' },
  bannerContent: { position: 'absolute', left: 24, top: 32, right: 24 },
  bannerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  bannerSubtitle: { fontSize: 16, color: '#fff', marginBottom: 20 },
  bannerButton: { backgroundColor: '#fff', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 28, alignSelf: 'flex-start' },
  bannerButtonText: { color: '#234B36', fontWeight: 'bold', fontSize: 18 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  sectionSeeAll: { color: '#8CB4A0', fontWeight: '500', fontSize: 14 },
  causeCard: { width: 180, backgroundColor: '#F5F7F5', borderRadius: 16, marginRight: 16, padding: 12 },
  causeImage: { width: '100%', height: 80, borderRadius: 12, marginBottom: 8 },
  causeTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  causeRaised: { fontSize: 12, color: '#666', marginBottom: 6 },
  progressBarBg: { width: '100%', height: 6, backgroundColor: '#D5DFDB', borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: '#234B36', borderRadius: 3 },
  orgCircleWrapper: { alignItems: 'center', marginRight: 16 },
  orgCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#eee', marginBottom: 4 },
  orgCircleText: { fontSize: 12, color: '#234B36', fontWeight: 'bold', textAlign: 'center', width: 60 },
  orgCirclePlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E5EAE5', marginRight: 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 64, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 10, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: -2 }, shadowRadius: 8 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Home;