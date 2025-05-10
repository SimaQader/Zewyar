import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy, startAt, endAt } from 'firebase/firestore';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const retryOperation = async (operation, retries = MAX_RETRIES) => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
};

const fetchCollection = async (collectionName) => {
  try {
    return await retryOperation(async () => {
      const collectionRef = collection(db, collectionName);
      const snapshot = await getDocs(collectionRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    if (error.code === 'permission-denied') {
      console.error('Firebase permission denied. Please check your security rules.');
    }
    return [];
  }
};

<<<<<<< HEAD
// --- DEMO DATA FOR EXACT MATCH TO SCREENSHOT ---
export const demoCauses = [
  {
    id: "1",
    title: "Protect Kurdistan's Mountain Forests",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
    raised: 85000,
    goal: 150000,
    description: "Help preserve the unique mountain forests of Kurdistan, home to diverse wildlife and traditional communities.",
    phone: "+9647501234567",
    progress: 56.7
  },
  {
    id: "2",
    title: "Clean Water for Rural Communities",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    raised: 125000,
    goal: 250000,
    description: "Support clean water initiatives in rural Kurdish villages to ensure safe drinking water for all communities.",
    phone: "+9647501234568",
    progress: 50.0
  },
  {
    id: "3",
    title: "Solar Energy for Schools",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    raised: 655000,
    goal: 1000000,
    description: "Help schools in Kurdistan transition to solar energy for a sustainable and reliable power source.",
    phone: "+9647501234569",
    progress: 65.5
  },
  {
    id: "4",
    title: "Urban Green Spaces in Hawler",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    raised: 255000,
    goal: 500000,
    description: "Create and maintain green spaces in Hawler to improve air quality and provide recreational areas for residents.",
    phone: "+9647501234570",
    progress: 51.0
  },
  {
    id: "5",
    title: "Wildlife Conservation in Kurdistan",
    image: "https://images.unsplash.com/photo-1534567110353-1f46a365bb9a",
    raised: 85000,
    goal: 200000,
    description: "Protect endangered species and their natural habitats in the mountains and valleys of Kurdistan.",
    phone: "+9647501234571",
    progress: 42.5
  }
];

// Sample data for organizations
const demoOrganizations = [
  {
    id: '1',
    name: 'Hasar Organization',
    category: 'Environment',
    date: 'Jan 3, 2022',
    views: 3344,
    logo: require('../assets/Hasar.png'),
    tags: ['Environment', 'None profit', 'International'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta.'
  },
  {
    id: '2',
    name: 'Rwanga Organization',
    category: 'General',
    date: 'Jan 1, 2022',
    views: 9823,
    logo: require('../assets/Rwanga.png'),
    tags: ['Environmental', 'Local'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sit eu tellus sed cursus eleifend id porta. Lorem adipiscing mus vestibulum consequat porta eu ultrices feugiat. Et, faucibus ut amet turpis. Facilisis faucibus semper cras purus.',
    website: 'https://www.rwanga.org/'
  },
  {
    id: '3',
    name: 'Pekawa',
    category: 'Environment',
    date: 'Feb 12, 2022',
    views: 5621,
    logo: require('../assets/Pekawa.png'),
    tags: ['Enviorment', 'Local', 'None profit'],
    description: 'Working to create sustainable solutions for environmental challenges worldwide.'
  },
  {
    id: '4',
    name: 'UNICEF',
    category: 'Intenational',
    date: 'Mar 5, 2022',
    views: 2187,
    logo: require('../assets/UNICEF.png'),
    tags: ['Intenational', 'None profit'],
    description: 'Supporting local communities through education and infrastructure development.'
  },
  {
    id: '5',
    name: 'Friends of the Earth International',
    category: 'Environment',
    date: 'Jan 15, 2022',
    views: 7432,
    logo: require('../assets/Friends_of_the_Earth.png'),
    tags: ['Technology', 'International'],
    description: 'Bringing technology education and resources to underserved communities.'
  }
];

const demoBlogs = [
  {
    id: '1',
    title: 'Kurdistan\'s Mountain Ecosystems: A Climate Change Hotspot',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2024-03-15',
    views: 2345,
    author: 'Dr. Karwan Hassan',
    category: 'Climate Action',
    description: 'How climate change is affecting Kurdistan\'s unique mountain ecosystems and what local communities are doing to adapt.',
    content: 'The mountains of Kurdistan, home to diverse ecosystems and traditional communities, are experiencing rapid changes due to climate change. Rising temperatures and changing precipitation patterns are threatening these fragile environments...'
  },
  {
    id: '2',
    title: 'SDG 13 in Action: Kurdish Youth Leading Climate Initiatives',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    date: '2024-03-10',
    views: 1890,
    author: 'Sara Ahmed',
    category: 'SDG Goals',
    description: 'Young activists in Kurdistan are taking the lead in implementing climate action initiatives aligned with Sustainable Development Goals.',
    content: 'Across Kurdistan, youth-led organizations are implementing innovative solutions to address climate change. From tree planting campaigns to renewable energy projects, these initiatives are making a real impact...'
  },
  {
    id: '3',
    title: 'Sustainable Water Management in the Kurdish Plains',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    date: '2024-03-05',
    views: 1567,
    author: 'Rebin Mohammed',
    category: 'Sustainability',
    description: 'Traditional and modern approaches to water conservation in Kurdistan\'s agricultural regions.',
    content: 'Water scarcity is becoming an increasing concern in Kurdistan\'s agricultural heartlands. This article explores how traditional water management practices are being combined with modern technology to ensure sustainable water use...'
  },
  {
    id: '4',
    title: 'Renewable Energy Revolution in Kurdistan',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    date: '2024-03-01',
    views: 2100,
    author: 'Amin Rashid',
    category: 'Clean Energy',
    description: 'How Kurdistan is transitioning to renewable energy sources and creating green jobs.',
    content: 'Kurdistan is embracing renewable energy as a key solution to both climate change and energy security. Solar and wind projects are not only reducing carbon emissions but also creating new economic opportunities...'
  },
  {
    id: '5',
    title: 'Greening Hawler: Urban Parks and Clean Air Initiatives',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    date: '2024-02-25',
    views: 1789,
    author: 'Lana Ibrahim',
    category: 'Urban Sustainability',
    description: 'How Hawler is transforming its urban landscape with green spaces and clean air initiatives to combat pollution and improve quality of life.',
    content: 'Hawler, the capital of the Kurdistan Region, is undergoing a green transformation. From the expansion of Sami Abdulrahman Park to new urban gardens and tree-planting initiatives, the city is working to improve air quality and create more sustainable urban spaces. This article explores the various projects aimed at making Hawler a greener, healthier city for its residents...'
  }
];

const fetchCauses = async () => demoCauses;
const fetchOrganizations = async () => demoOrganizations;
const fetchBlogs = async () => demoBlogs;
=======
const fetchCauses = () => fetchCollection('causes');
const fetchOrganizations = () => fetchCollection('organizations');
const fetchBlogs = () => fetchCollection('blogs');
>>>>>>> origin/main

const searchCauses = async (searchTerm) => {
  try {
    return await retryOperation(async () => {
      const causesRef = collection(db, 'causes');
      const q = query(
        causesRef,
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        orderBy('title')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  } catch (error) {
    console.error('Error searching causes:', error);
    return [];
  }
};

const searchOrganizations = async (searchTerm) => {
  try {
    return await retryOperation(async () => {
      const orgsRef = collection(db, 'organizations');
      const q = query(
        orgsRef,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff'),
        orderBy('name')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  } catch (error) {
    console.error('Error searching organizations:', error);
    return [];
  }
};

const searchBlogs = async (searchTerm) => {
  try {
    return await retryOperation(async () => {
      const blogsRef = collection(db, 'blogs');
      const q = query(
        blogsRef,
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff'),
        orderBy('title')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    return [];
  }
};

<<<<<<< HEAD
const updateDonationProgress = async (donationId, newRaised, newProgress) => {
  try {
    const updatedCauses = demoCauses.map(cause => {
      if (cause.id === donationId) {
        return {
          ...cause,
          raised: newRaised,
          progress: newProgress
        };
      }
      return cause;
    });
    
    // Update the demoCauses array
    demoCauses.length = 0;
    demoCauses.push(...updatedCauses);
    
    return true;
  } catch (error) {
    console.error('Error updating donation progress:', error);
    return false;
  }
};

=======
>>>>>>> origin/main
const dataService = {
  fetchCauses,
  fetchOrganizations,
  fetchBlogs,
  searchCauses,
  searchOrganizations,
<<<<<<< HEAD
  searchBlogs,
  updateDonationProgress
=======
  searchBlogs
>>>>>>> origin/main
};

export default dataService; 