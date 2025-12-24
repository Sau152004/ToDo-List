
// import './App.css'
// import TodoList  from './TodoList'

// function App() {
  

//   return (
//     <>
      
//       <TodoList />
//     </>
//   )
// }

// export default App


// src/App.jsx
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import { saveTodos, loadTodos } from './firestore.js';
import './App.css';
import Auth from './Auth.jsx';
import ProductivityDashboard from './ProductivityDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // ============ AUTH STATE LISTENER ============
  // Track login/logout and load todos from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoading(true);
        
        if (currentUser) {
          // User logged in - load their todos from Firestore
          console.log('👤 User logged in:', currentUser.email);
          setUser(currentUser);
          
          try {
            const cloudTodos = await loadTodos(currentUser.uid);
            setTodos(cloudTodos);
          } catch (error) {
            console.error('❌ Failed to load todos:', error);
            alert('Failed to load your tasks. Please refresh.');
            setTodos([]);
          }
        } else {
          // User logged out - clear all data
          console.log('👤 User logged out');
          setUser(null);
          setTodos([]);
        }
      } finally {
        setLoading(false);
      }
    });

    // Cleanup: unsubscribe from auth listener
    return () => unsubscribe();
  }, []);

  // ============ AUTO-SYNC TO FIRESTORE ============
  // Save todos to Firestore whenever they change
  useEffect(() => {
    if (user && todos.length >= 0) {
      const saveToCloud = async () => {
        try {
          setSyncing(true);
          await saveTodos(user.uid, todos);
        } catch (error) {
          console.error('❌ Failed to sync todos:', error);
        } finally {
          setSyncing(false);
        }
      };

      // Debounce: wait 1 second after todos change before saving
      const timer = setTimeout(saveToCloud, 1000);
      return () => clearTimeout(timer);
    }
  }, [todos, user]);

  // ============ LOADING STATE ============
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f9ff',
        fontSize: '16px',
        color: '#64748b'
      }}>
        ⏳ Loading your tasks...
      </div>
    );
  }

  // ============ RENDER ============
  return (
    <>
      {user ? (
        <>
          {/* Sync indicator */}
          {syncing && (
            <div style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              zIndex: 1000,
              animation: 'pulse 1s infinite'
            }}>
              💾 Syncing...
            </div>
          )}

          {/* Pass user, todos, setTodos to Dashboard */}
          <ProductivityDashboard 
            user={user} 
            todos={todos} 
            setTodos={setTodos}
          />
        </>
      ) : (
        // Show login UI when not authenticated
        <Auth user={user} setUser={setUser} />
      )}
    </>
  );
}

export default App;