import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDumaKMKq5md6xoqLdoE2K4NGaLzjpnUtU',
  authDomain: 'mome-cloud.firebaseapp.com',
  projectId: 'mome-cloud',
  storageBucket: 'mome-cloud.appspot.com',
  messagingSenderId: '171489193697',
  appId: '1:171489193697:web:fe9df7ce7e4320183ed1a0',
  measurementId: 'G-B057NGF65C'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
