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
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
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
      </View>
    </TouchableOpacity>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Donations</Text>
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
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Ionicons
            name="mic-outline"
            size={20}
            color="#999"
            style={{ marginRight: 12, marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filterRow}>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDonations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
