// // DonationsScreen.js
// import React, { useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Image, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput,
//   SafeAreaView,
//   StatusBar
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// // Mock data for donation cases
// const donationCases = [
//   {
//     id: '1',
//     title: 'Plant tree for a school',
//     amount: '85000',
//     progress: 55,
//     image: require('../assets/Earth.png'),
//     urgent: true
//   },
//   {
//     id: '2',
//     title: 'Filadelfia, Paraguay The Division for Sustainable',
//     amount: '125000',
//     progress: 40,
//     image: require('../assets/Earth.png'),
//     urgent: true
//   },
//   {
//     id: '3',
//     title: 'Development Goals, DESA, in collaboration',
//     amount: '655000',
//     progress: 75,
//     image: require('../assets/Earth.png'),
//     urgent: false
//   },
//   {
//     id: '4',
//     title: 'Technical Secretariat for Planning and Economic',
//     amount: '255000',
//     progress: 10,
//     image: require('../assets/Earth.png'),
//     urgent: false
//   },
//   {
//     id: '5',
//     title: 'Capacity Building Workshop on Sub-national',
//     amount: '85000',
//     progress: 55,
//     image: require('../assets/Earth.png'),
//     urgent: false
//   }
// ];

// const Donation= ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('urgent');
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const filteredCases = donationCases.filter(item => 
//     (activeTab === 'urgent' ? item.urgent : !item.urgent)
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header with logo */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Donations</Text>
//           <Text style={styles.headerSubtitle}>wanna be a part of better environment?</Text>
//         </View>
//         <Image 
//           source={require('../assets/Earth.png')} 
//           style={styles.logo}
//         />
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Ionicons name="mic-outline" size={24} color="#666" />
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'urgent' && styles.activeTab]}
//           onPress={() => setActiveTab('urgent')}
//         >
//           <Text style={[styles.tabText, activeTab === 'urgent' && styles.activeTabText]}>
//             Urgent casess
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'other' && styles.activeTab]}
//           onPress={() => setActiveTab('other')}
//         >
//           <Text style={[styles.tabText, activeTab === 'other' && styles.activeTabText]}>
//             Other Cases
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Donation Cases List */}
//       <ScrollView style={styles.casesContainer}>
//         {filteredCases.map(item => (
//           <TouchableOpacity 
//             key={item.id}
//             style={styles.caseItem}
//             onPress={() => navigation.navigate('DonationDetails', { item })}
//           >
//             <Image source={item.image} style={styles.caseImage} />
//             <View style={styles.caseContent}>
//               <Text style={styles.caseTitle} numberOfLines={2}>{item.title}</Text>
//               <Text style={styles.caseAmount}>$ {item.amount}</Text>
              
//               <View style={styles.progressContainer}>
//                 <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
//                 <Text style={styles.progressText}>{item.progress}%</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="home-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
//           <Ionicons name="heart-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="people-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="chatbubble-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// // DonationDetailsScreen.js
// const Donationinside = ({ route, navigation }) => {
//   const { item } = route.params;
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header Image */}
//       <Image 
//         source={require('../assets/Earth.png')} 
//         style={styles.detailHeaderImage} 
//       />
      
//       <View style={styles.detailContent}>
//         <Text style={styles.recentDonationText}>Recent Donation</Text>
        
//         <Text style={styles.detailPrice}>$ 190,00</Text>
        
//         <View style={styles.timeLeftContainer}>
//           <Ionicons name="time-outline" size={18} color="#8BC34A" />
//           <Text style={styles.timeLeftText}>15 days left</Text>
//         </View>
        
//         <View style={styles.detailProgressContainer}>
//           <View style={[styles.detailProgressBar, { width: '30%' }]} />
//           <Text style={styles.detailProgressText}>30%</Text>
//         </View>
        
//         <Text style={styles.detailTitle}>Plant tree for a school</Text>
        
//         <Text style={styles.detailDescription}>
//           The Division for Sustainable Development Goals, DESA, in collaboration with 
//           Paraguay's Technical Secretariat for Planning and Economic Development{'\n\n'}
//           The participating local governments (Boqueron, Campo Aceval, Filadelfia, Irala 
//           Ferndandez, Loma Plata and Mariscal Estigarribia) and the United Nations.
//         </Text>
        
//         <TouchableOpacity onPress={() => {}}>
//           <Text style={styles.seeMoreText}>See more</Text>
//         </TouchableOpacity>
        
//         <Text style={styles.similarProgramsText}>Similar Programs</Text>
        
//         {/* Donate Button */}
//         <TouchableOpacity style={styles.donateButton}>
//           <Text style={styles.donateButtonText}>Donate ♥</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Donations')}>
//           <Ionicons name="home-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
//           <Ionicons name="heart-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="people-outline" size={24} color="#000" />
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.navItem}>
//           <Ionicons name="chatbubble-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Shared styles for both screens
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   headerTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 4,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     borderRadius: 24,
//     marginHorizontal: 16,
//     marginVertical: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 8,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     marginHorizontal: 16,
//     marginBottom: 12,
//   },
//   tab: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 24,
//     marginRight: 12,
//   },
//   activeTab: {
//     backgroundColor: '#1b5e20',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   activeTabText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   casesContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   caseItem: {
//     flexDirection: 'row',
//     marginBottom: 16,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     overflow: 'hidden',
//   },
//   caseImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 12,
//   },
//   caseContent: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     justifyContent: 'space-between',
//   },
//   caseTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     marginBottom: 4,
//   },
//   caseAmount: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//   },
//   progressContainer: {
//     height: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     overflow: 'hidden',
//     position: 'relative',
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#1b5e20',
//     borderRadius: 4,
//   },
//   progressText: {
//     position: 'absolute',
//     right: 0,
//     top: 8,
//     fontSize: 12,
//     color: '#666',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   navItem: {
//     padding: 8,
//   },
//   activeNavItem: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 20,
//   },
//   // Detail screen styles
//   detailHeaderImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//     borderRadius: 12,
//   },
//   detailContent: {
//     flex: 1,
//     padding: 16,
//   },
//   recentDonationText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   detailPrice: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   timeLeftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   timeLeftText: {
//     color: '#8BC34A',
//     marginLeft: 4,
//   },
//   detailProgressContainer: {
//     height: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//     overflow: 'hidden',
//     position: 'relative',
//     marginBottom: 16,
//   },
//   detailProgressBar: {
//     height: '100%',
//     backgroundColor: '#1b5e20',
//     borderRadius: 4,
//   },
//   detailProgressText: {
//     position: 'absolute',
//     right: 0,
//     top: 8,
//     fontSize: 12,
//     color: '#666',
//   },
//   detailTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   detailDescription: {
//     fontSize: 16,
//     color: '#333',
//     lineHeight: 22,
//     marginBottom: 8,
//   },
//   seeMoreText: {
//     color: '#8BC34A',
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   similarProgramsText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   donateButton: {
//     backgroundColor: '#1b5e20',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   donateButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export { Donation, Donationinside};