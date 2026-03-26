import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzw_aWWVVVNs2LTpMuSdpvufWEfxCEKqA",
  authDomain: "shop-mandu.firebaseapp.com",
  projectId: "shop-mandu",
  storageBucket: "shop-mandu.firebasestorage.app",
  messagingSenderId: "158276325242",
  appId: "1:158276325242:web:d09bc7f997e73c21b090c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT LINE
export const auth = getAuth(app);