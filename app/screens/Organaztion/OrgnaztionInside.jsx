import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const OrganizationDetailScreen = ({ route, navigation }) => {
  // Get organization data from route params
  // In a real app, you would pass this data when navigating to this screen
  const { organization } = route.params || { 
    organization: {
      id: 2,
      name: 'Rwanga Organization',
      category: 'Environmental',
      date: 'Jan 1, 2021',
      views: '3344',
      logo: require('../../assets/logo.png'),
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta. Lorem adipiscing mus vestibulum consequat porta eu ultrices feugiat. Et, faucibus ut amet turpis. Facilisis faucibus semper cras purus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta.',
        'Fermentum et eget libero lectus. Amet, tellus aliquam, dignissim enim placerat purus nunc, ac ipsum. Ac pretium.'
      ],
      website: 'https://www.rwanga.org/',
      tags: ['environmental', 'Local']
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        {/* Header with back button, search and filter */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#888"
            />
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="sliders" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        {/* Organization Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={organization.logo}
            style={styles.logo}
          />
        </View>
        
        {/* Tags and metadata */}
        <View style={styles.metaContainer}>
          <View style={styles.tagContainer}>
            {organization.tags && organization.tags.map(tag => (
              <Text key={tag} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <Text style={styles.metaText}>{organization.date} • {organization.views} views</Text>
        </View>
        
        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{organization.name}</Text>
          
          {organization.description && organization.description.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
          
          {/* Website link */}
          {organization.website && (
            <View style={styles.websiteContainer}>
              <Icon name="globe" size={20} color="#333" />
              <Text style={styles.websiteText}>{organization.website}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  metaContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 12,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  websiteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  websiteText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default OrganizationDetailScreen;