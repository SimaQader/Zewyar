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

const fetchCauses = () => fetchCollection('causes');
const fetchOrganizations = () => fetchCollection('organizations');
const fetchBlogs = () => fetchCollection('blogs');

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

const dataService = {
  fetchCauses,
  fetchOrganizations,
  fetchBlogs,
  searchCauses,
  searchOrganizations,
  searchBlogs
};

export default dataService; 