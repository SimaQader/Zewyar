import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CauseCard = ({ title, amount, target, image }) => {
  const progress = (amount / target) * 100;

  return (
    <View style={styles.causeCard}>
      <Image 
        source={{ uri: image }} 
        style={styles.causeImage}
      />
      <View style={styles.causeContent}>
        <Text style={styles.causeTitle}>{title}</Text>
        <Text style={styles.causeAmount}>${amount.toLocaleString()} raised of ${target.toLocaleString()}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  causeCard: {
    width: 170,
    height: 180,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
  },
  causeImage: {
    width: '100%',
    height: 85,
  },
  causeContent: {
    padding: 10,
  },
  causeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  causeAmount: {
    fontSize: 11,
    color: '#555',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#357955',
    borderRadius: 3,
  },
});

export default CauseCard; 