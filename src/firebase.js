import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBR3Hz7c7vZq8v4wC36M_Uv4L8PSOfaB2o',
  authDomain: 'student-management-4e880.firebaseapp.com',
  projectId: 'student-management-4e880',
  storageBucket: 'student-management-4e880.firebasestorage.app',
  messagingSenderId: '858305118494',
  appId: '1:858305118494:web:0f56b1a2b9d10f0922490f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
