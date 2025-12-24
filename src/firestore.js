import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Save todos to Firestore
export const saveTodos = async (userId, todos) => {
  await setDoc(doc(db, "users", userId), {
    todos,
    updatedAt: new Date(),
  });
};

// Load todos from Firestore
export const loadTodos = async (userId) => {
  const snapshot = await getDoc(doc(db, "users", userId));
  return snapshot.exists() ? snapshot.data().todos : [];
};
