import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomBar from '../components/BottomBar';

const CauseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cause } = route.params;
  const [showMore, setShowMore] = useState(false);

  // Placeholder for similar programs
  const similarPrograms = [cause, { ...cause, id: 'sim1', title: 'Similar Program 1' }, { ...cause, id: 'sim2', title: 'Similar Program 2' }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: cause.image }} style={styles.image} />
        </View>

        {/* Meta */}
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Recent Donation</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountText}>${cause.raised}</Text>
          <View style={styles.daysLeftRow}>
            <Ionicons name="time-outline" size={18} color="#8CB4A0" />
            <Text style={styles.daysLeftText}>15 days left</Text>
          </View>
          <Text style={styles.percentText}>{Math.round((cause.raised / cause.goal) * 100)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${Math.min(100, (cause.raised / cause.goal) * 100)}%` }]} />
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>{cause.title}</Text>
        <Text style={styles.description} numberOfLines={showMore ? undefined : 3}>
          {cause.description}
        </Text>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text style={styles.seeMore}>{showMore ? 'See less' : 'See more'}</Text>
        </TouchableOpacity>

        {/* Similar Programs */}
        <Text style={styles.similarTitle}>Similar Programs</Text>
        <FlatList
          data={similarPrograms}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 0, paddingRight: 8, marginBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.similarCard}>
              <Image source={{ uri: item.image }} style={styles.similarImage} />
              <View style={styles.progressBarBgSmall}>
                <View style={[styles.progressBarFillSmall, { width: `${Math.min(100, (item.raised / item.goal) * 100)}%` }]} />
              </View>
              <Text style={styles.similarPercent}>{Math.round((item.raised / item.goal) * 100)}%</Text>
            </View>
          )}
        />
      </ScrollView>
      {/* Donate Button */}
      <TouchableOpacity style={styles.donateButton} onPress={() => navigation.navigate('DonationSend', { cause })}>
        <Text style={styles.donateButtonText}>Donate <Ionicons name="heart" size={18} color="#fff" /></Text>
      </TouchableOpacity>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFCF8' },
  imageWrapper: { margin: 20, borderRadius: 20, overflow: 'hidden' },
  image: { width: '100%', height: 180, borderRadius: 20 },
  metaRow: { marginHorizontal: 20, marginTop: 8, marginBottom: 4 },
  metaLabel: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  amountRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 4 },
  amountText: { fontSize: 18, fontWeight: 'bold', color: '#222', marginRight: 12 },
  daysLeftRow: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  daysLeftText: { color: '#8CB4A0', fontSize: 16, marginLeft: 4 },
  percentText: { fontSize: 16, color: '#8CB4A0', fontWeight: 'bold', marginLeft: 'auto' },
  progressBarBg: { width: '90%', height: 8, backgroundColor: '#E0E5E2', borderRadius: 4, marginHorizontal: 20, marginBottom: 12 },
  progressBarFill: { height: 8, backgroundColor: '#234B36', borderRadius: 4 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111', marginHorizontal: 20, marginBottom: 8 },
  description: { fontSize: 16, color: '#333', marginHorizontal: 20, marginBottom: 4 },
  seeMore: { color: '#8CB4A0', fontWeight: '500', marginHorizontal: 20, marginBottom: 12 },
  similarTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginHorizontal: 20, marginTop: 16, marginBottom: 8 },
  similarCard: { width: 120, backgroundColor: '#fff', borderRadius: 16, marginRight: 16, padding: 8, alignItems: 'center' },
  similarImage: { width: 100, height: 60, borderRadius: 12, marginBottom: 8 },
  progressBarBgSmall: { width: '90%', height: 6, backgroundColor: '#E0E5E2', borderRadius: 3 },
  progressBarFillSmall: { height: 6, backgroundColor: '#234B36', borderRadius: 3 },
  similarPercent: { fontSize: 12, color: '#234B36', fontWeight: 'bold', marginTop: 2 },
  donateButton: { backgroundColor: '#234B36', borderRadius: 12, margin: 20, paddingVertical: 16, alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 0 },
  donateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CauseDetail; 