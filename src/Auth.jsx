// src/Auth.jsx
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase.js';
import { LogOut, Mail } from 'lucide-react';

export default function Auth({ user, setUser }) {
  const handleGoogleLogin = async () => {
    try {
      console.log('🔐 Attempting Google login...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Login successful:', result.user.email);
      setUser(result.user);
    } catch (error) {
      console.error('❌ Full error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      if (error.code === 'auth/cancelled-popup-request') {
        alert('Popup was cancelled. Please try again. Make sure pop-ups are allowed.');
      } else if (error.code === 'auth/popup-blocked') {
        alert('Pop-up was blocked. Please allow pop-ups for this site.');
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        backgroundColor: '#e0f2fe',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            fontWeight: '500',
            color: '#0c4a6e'
          }}>
            Signed in as
          </p>
          <p style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '600',
            color: '#0369a1'
          }}>
            {user.displayName || user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    );
  }

  // Not logged in - show login UI
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f9ff',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '48px 32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0 0 12px 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Productivity Dashboard
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          textAlign: 'center',
          margin: '0 0 32px 0'
        }}>
          Sign in to sync your tasks across all devices
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#357ae8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4285f4'}
        >
          <Mail size={20} />
          Sign in with Google
        </button>

        <p style={{
          fontSize: '12px',
          color: '#94a3b8',
          textAlign: 'center',
          margin: '24px 0 0 0'
        }}>
          Your data is encrypted and stored securely in the cloud.
        </p>
      </div>
    </div>
  );
}