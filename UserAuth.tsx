import React, { useState } from 'react';
import TrialManager from './TrialManager';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserAuthProps {
  onRegistration?: (user: User) => void;
}

export const UserAuth: React.FC<UserAuthProps> = ({ onRegistration }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleQuickStart = async () => {
    const userId = `user_${Date.now()}`;
    const user: User = {
      id: userId,
      email: email || `guest_${Date.now()}@gargaar.local`,
      name: name || 'Guest User',
    };

    // Create free trial for user
    const trial = TrialManager.createNewTrial(user.id, user.email);
    TrialManager.saveUser(trial);

    // Save user
    localStorage.setItem(`gargaar_user_${user.id}`, JSON.stringify(user));
    localStorage.setItem('gargaar_current_user_id', user.id);

    setCurrentUser(user);
    onRegistration?.(user);
    setIsRegistering(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('gargaar_current_user_id');
    setCurrentUser(null);
    setEmail('');
    setName('');
  };

  if (currentUser) {
    return (
      <div style={styles.userInfo}>
        <p>Welcome, {currentUser.name}!</p>
        <p>Email: {currentUser.email}</p>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Get Started Free - 7 Days Trial</h2>
      <p>Access all courses for free for the first week</p>
      
      {isRegistering && (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Your Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
      )}
      
      <button
        onClick={() => {
          if (!isRegistering) {
            setIsRegistering(true);
          } else {
            handleQuickStart();
          }
        }}
        style={styles.startBtn}
      >
        {isRegistering ? 'Start Free Trial' : 'Start Learning Free'}
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  startBtn: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  userInfo: {
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserAuth;
