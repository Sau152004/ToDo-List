// // Firebase core
// import { initializeApp } from "firebase/app";

// // Firebase services you need
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // ✅ Your REAL Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDjfsPPxpomZsi2E1aEt-vwcj8qgoDQAE4",
//   authDomain: "todo-productivity-app-58cee.firebaseapp.com",
//   projectId: "todo-productivity-app-58cee",
//   storageBucket: "todo-productivity-app-58cee.appspot.com",
//   messagingSenderId: "112554802846",
//   appId: "1:112554802846:web:21ddd1df5ee1b51d52458f",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ Export services you’ll actually use
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjfsPPxpomZsi2E1aEt-vwcj8qgoDQAE4",
  authDomain: "todo-productivity-app-58cee.firebaseapp.com",
  projectId: "todo-productivity-app-58cee",
  storageBucket: "todo-productivity-app-58cee.appspot.com",
  messagingSenderId: "112554802846",
  appId: "1:112554802846:web:21ddd1df5ee1b51d52458f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // ✅ FIX
export const db = getFirestore(app);
