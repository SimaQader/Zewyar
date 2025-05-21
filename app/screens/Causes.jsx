// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../components/Header';
// import { Ionicons } from '@expo/vector-icons';
// import dataService from '../services/dataService';

// const Causes = () => {
//   const navigation = useNavigation();
//   const [causes, setCauses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCauses = async () => {
//       try {
//         const causesData = await dataService.fetchCauses();
//         setCauses(causesData);
//       } catch (error) {
//         console.error('Error loading causes:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCauses();
//   }, []);

//   const handleCausePress = (cause) => {
//     navigation.navigate('CauseDetail', { cause });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Header />
        
//         <View style={styles.header}>
//           <Text style={styles.title}>Causes</Text>
//           <Text style={styles.subtitle}>Support meaningful initiatives</Text>
//         </View>

//         <View style={styles.causesContainer}>
//           {causes.map((cause) => (
//             <TouchableOpacity 
//               key={cause.id} 
//               style={styles.causeCard}
//               onPress={() => handleCausePress(cause)}
//             >
//               <Image
//                 source={{ uri: cause.image }}
//                 style={styles.causeImage}
//                 resizeMode="cover"
//               />
//               <View style={styles.causeContent}>
//                 <Text style={styles.causeCategory}>{cause.category?.toUpperCase()}</Text>
//                 <Text style={styles.causeTitle}>{cause.title}</Text>
//                 <Text style={styles.causeDescription} numberOfLines={2}>
//                   {cause.description}
//                 </Text>
//                 <View style={styles.progressContainer}>
//                   <View style={styles.progressBar}>
//                     <View 
//                       style={[
//                         styles.progressFill,
//                         { width: `${(cause.raised / cause.goal) * 100}%` }
//                       ]} 
//                     />
//                   </View>
//                   <View style={styles.progressStats}>
//                     <Text style={styles.raisedAmount}>${cause.raised} raised</Text>
//                     <Text style={styles.goalAmount}>Goal: ${cause.goal}</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity 
//                   style={styles.donateButton}
//                   onPress={() => handleCausePress(cause)}
//                 >
//                   <Text style={styles.donateButtonText}>Donate Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E8F5E9',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//   },
//   causesContainer: {
//     padding: 20,
//   },
//   causeCard: {
//     marginBottom: 20,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   causeImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   causeContent: {
//     padding: 16,
//   },
//   causeCategory: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 8,
//   },
//   causeTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   causeDescription: {
//     fontSize: 14,
//     color: '#666',
//     lineHeight: 20,
//     marginBottom: 12,
//   },
//   progressContainer: {
//     marginBottom: 16,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#E8F5E9',
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
//     borderRadius: 4,
//   },
//   progressStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   raisedAmount: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   goalAmount: {
//     fontSize: 14,
//     color: '#666',
//   },
//   donateButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   donateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Causes; 