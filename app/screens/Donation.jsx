<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BottomBar from "../components/BottomBar";
import dataService from "../services/dataService";

const Donation = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("Urgent cases");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDonations = async () => {
      try {
        const causesData = await dataService.fetchCauses();
        setDonations(causesData);
      } catch (error) {
        console.error("Error loading donations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDonations();
  }, []);

  const filteredDonations = donations.filter((d) =>
=======
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from '../components/BottomBar';

// Dummy donation cases
const DUMMY_DONATIONS = [
  {
    id: '1',
    title: 'Plant tree for a school',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    amount: 85000,
    raised: 190,
    progress: 55,
    description: 'Help us plant trees for a greener school environment.',
    phone: '+1234567890'
  },
  {
    id: '2',
    title: 'Filadelfia, Paraguay The Division for Sustainable',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    amount: 125000,
    raised: 50000,
    progress: 40,
    description: 'Support sustainable development in Filadelfia, Paraguay.',
    phone: '+1234567891'
  },
  {
    id: '3',
    title: 'Development Goals, DESA, in collaboration',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    amount: 655000,
    raised: 491250,
    progress: 75,
    description: 'Join us in achieving development goals with DESA.',
    phone: '+1234567892'
  },
  {
    id: '4',
    title: 'Technical Secretariat for Planning and Economic',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    amount: 255000,
    raised: 25500,
    progress: 10,
    description: 'Support economic planning and technical projects.',
    phone: '+1234567893'
  },
  {
    id: '5',
    title: 'Capacity Building Workshop on Sub-national',
    image: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=800&q=80',
    amount: 85000,
    raised: 46750,
    progress: 55,
    description: 'Help us build capacity at the sub-national level.',
    phone: '+1234567894'
  }
];

const Donation = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [donations, setDonations] = useState(DUMMY_DONATIONS);
  const [filter, setFilter] = useState('Urgent cases');

  const filteredDonations = donations.filter(d =>
>>>>>>> origin/main
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
<<<<<<< HEAD
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DonationDetailScreen", { donation: item })
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
=======
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DonationDetailScreen', { donation: item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>$ {item.amount.toLocaleString()}</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{item.progress}%</Text>
>>>>>>> origin/main
      </View>
    </TouchableOpacity>
  );

<<<<<<< HEAD
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#234B36" />
      </View>
    );
  }

=======
>>>>>>> origin/main
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Donations</Text>
<<<<<<< HEAD
        <Text style={styles.subheading}>
          wanna be a part of better environment?
        </Text>
      </View>
      <View style={styles.searchRow}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginLeft: 12, marginRight: 8 }}
        />
=======
        <Text style={styles.subheading}>wanna be a part of better environment?</Text>
      </View>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 12, marginRight: 8 }} />
>>>>>>> origin/main
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
<<<<<<< HEAD
          <Ionicons
            name="mic-outline"
            size={20}
            color="#999"
            style={{ marginRight: 12, marginLeft: 8 }}
          />
=======
          <Ionicons name="mic-outline" size={20} color="#999" style={{ marginRight: 12, marginLeft: 8 }} />
>>>>>>> origin/main
        </TouchableOpacity>
      </View>
      <View style={styles.filterRow}>
        <TouchableOpacity
<<<<<<< HEAD
          style={[
            styles.filterButton,
            filter === "Urgent cases" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("Urgent cases")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "Urgent cases" && styles.filterTextActive,
            ]}
          >
            Urgent cases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Other Cases" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("Other Cases")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "Other Cases" && styles.filterTextActive,
            ]}
          >
            Other Cases
          </Text>
=======
          style={[styles.filterButton, filter === 'Urgent cases' && styles.filterButtonActive]}
          onPress={() => setFilter('Urgent cases')}
        >
          <Text style={[styles.filterText, filter === 'Urgent cases' && styles.filterTextActive]}>Urgent cases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Other Cases' && styles.filterButtonActive]}
          onPress={() => setFilter('Other Cases')}
        >
          <Text style={[styles.filterText, filter === 'Other Cases' && styles.filterTextActive]}>Other Cases</Text>
>>>>>>> origin/main
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDonations}
<<<<<<< HEAD
        keyExtractor={(item) => item.id}
=======
        keyExtractor={item => item.id}
>>>>>>> origin/main
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: "#FAFCF8" },
  header: { padding: 20 },
  heading: { fontSize: 32, fontWeight: "bold", marginBottom: 8 },
  subheading: { fontSize: 16, color: "#222" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F5",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#222" },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#F5F7F5",
    marginRight: 12,
  },
  filterButtonActive: { backgroundColor: "#234B36" },
  filterText: { fontSize: 16, color: "#222" },
  filterTextActive: { color: "#fff", fontWeight: "bold" },
  list: { paddingHorizontal: 20, paddingBottom: 80 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: { width: 80, height: 80, borderRadius: 12, margin: 12 },
  cardContent: { flex: 1, justifyContent: "center", paddingVertical: 12 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  cardAmount: { fontSize: 14, color: "#234B36", marginBottom: 6 },
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
});

export default Donation;
=======
  container: { flex: 1, backgroundColor: '#FAFCF8' },
  header: { padding: 20 },
  heading: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subheading: { fontSize: 16, color: '#222' },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7F5', borderRadius: 16, marginHorizontal: 20, marginTop: 8, marginBottom: 20, height: 44 },
  searchInput: { flex: 1, fontSize: 16, color: '#222' },
  filterRow: { flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: 20, marginBottom: 16 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#F5F7F5', marginRight: 12 },
  filterButtonActive: { backgroundColor: '#234B36' },
  filterText: { fontSize: 16, color: '#222' },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  list: { paddingHorizontal: 20, paddingBottom: 80 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 12, margin: 12 },
  cardContent: { flex: 1, justifyContent: 'center', paddingVertical: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  amount: { fontSize: 14, color: '#234B36', marginBottom: 6 },
  progressBarBg: { width: '100%', height: 8, backgroundColor: '#E0E5E2', borderRadius: 4, marginBottom: 6 },
  progressBarFill: { height: 8, backgroundColor: '#234B36', borderRadius: 4 },
  progressText: { fontSize: 12, color: '#234B36', fontWeight: 'bold', alignSelf: 'flex-end' },
});

export default Donation;
>>>>>>> origin/main
