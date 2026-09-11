import React, { useState, useEffect } from 'react';
import StudHeader from '../components/StudHeader';
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

// Navigation Section
function NavigationSection() {
  return (
    <nav className="px-4 py-4 rounded-t-3xl mt-4 shadow-lg" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/studentdashboard" className="nav-link">Dashboard</Link>
            <Link to="/games" className="nav-link">Games</Link>
            <Link to="/learntopics" className="nav-link">Learn</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            <Link to="/profile" className="nav-link active">Profile</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm" style={{ color: 'var(--muted)' }}>Quick Actions</div>
            <Link to="/quiz" className="nav-btn">Quiz</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    grade: '',
    school: '',
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockProfile = {
        id: 'u1',
        name: 'Ruchikesha',
        email: 'ruchikesha@school.edu',
        grade: '8th',
        school: 'Delhi Public School',
        avatar: '👦🏽',
        ecoPoints: 1250,
        level: 5,
        joinDate: '2023-06-15',
        badges: [
          { id: 'b1', name: 'Eco Warrior', icon: '🌿', description: 'Completed 10 environmental games', dateEarned: '2023-07-20' },
          { id: 'b2', name: 'Quiz Master', icon: '🧠', description: 'Scored 100% in 5 different quizzes', dateEarned: '2023-08-05' },
          { id: 'b3', name: 'Tree Hugger', icon: '🌳', description: 'Planted 5 virtual trees', dateEarned: '2023-08-15' },
          { id: 'b4', name: 'Water Saver', icon: '💧', description: 'Completed all water conservation challenges', dateEarned: '2023-09-01' },
          { id: 'b5', name: 'Energy Expert', icon: '⚡', description: 'Mastered all energy conservation games', dateEarned: '2023-09-10' },
        ],
        achievements: [
          { id: 'a1', title: 'Game Explorer', description: 'Play all types of eco games', progress: 4, total: 5, completed: false },
          { id: 'a2', title: 'Knowledge Seeker', description: 'Complete 20 eco quizzes', progress: 14, total: 20, completed: false },
          { id: 'a3', title: 'Eco Influencer', description: 'Reach level 10', progress: 5, total: 10, completed: false },
          { id: 'a4', title: 'Badge Collector', description: 'Earn 10 different badges', progress: 5, total: 10, completed: false },
          { id: 'a5', title: 'Daily Learner', description: 'Log in for 30 consecutive days', progress: 30, total: 30, completed: true },
        ],
        stats: { gamesPlayed: 45, gamesWon: 38, questsCompleted: 12, treesPlanted: 5, co2Saved: 120 }
      };

      setProfile(mockProfile);
      setEditForm({
        name: mockProfile.name,
        email: mockProfile.email,
        grade: mockProfile.grade,
        school: mockProfile.school,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveProfile = () => {
    if (profile) {
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <AnimatedBackground />
        <div className="flex flex-col overflow-hidden relative z-10">
          <StudHeader user={{ name: "Loading...", ecoPoints: 0 }} activeTab="profile" />
          <NavigationSection />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="rounded-3xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto" style={{ borderColor: 'var(--primary)' }}></div>
                <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading your profile...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <AnimatedBackground />
        <div className="flex flex-col overflow-hidden relative z-10">
          <StudHeader user={{ name: "Error", ecoPoints: 0 }} activeTab="profile" />
          <NavigationSection />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="rounded-3xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Profile Not Found</h2>
                <p style={{ color: 'var(--muted)' }}>Unable to load your profile information.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <AnimatedBackground />
      <div className="flex flex-col overflow-hidden relative z-10">
        <StudHeader user={{...profile, badges: profile.badges.length}} activeTab="profile" />
        <NavigationSection />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            {/* Hero Banner */}
            <section className="rounded-3xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                  👤 Your Eco Profile 🌟
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted)' }}>
                  Track your environmental journey and achievements
                </p>
              </div>
            </section>

            {/* Profile Header */}
            <div className="rounded-3xl p-8" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{ background: 'rgba(22,163,74,0.15)' }}>
                  {profile.avatar}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>{profile.name}</h1>
                      <p className="text-lg mb-3" style={{ color: 'var(--muted)' }}>{profile.email}</p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 rounded-xl text-sm font-medium" style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--primary)' }}>
                          {profile.grade} Grade
                        </span>
                        <span className="px-3 py-1 rounded-xl text-sm font-medium" style={{ background: 'rgba(6,182,212,0.1)', color: '#0284c7' }}>
                          {profile.school}
                        </span>
                        <span className="px-3 py-1 rounded-xl text-sm font-medium" style={{ background: 'rgba(245,158,11,0.1)', color: '#ca8a04' }}>
                          Joined {profile.joinDate}
                        </span>
                      </div>
                    </div>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)} 
                        className="mt-4 md:mt-0 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

              {isEditing ? (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={editForm.name} 
                        onChange={handleEditFormChange} 
                        className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          background: 'var(--panel)', 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          color: 'var(--text)',
                          focusRingColor: 'var(--primary)'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={editForm.email} 
                        onChange={handleEditFormChange} 
                        className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          background: 'var(--panel)', 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          color: 'var(--text)'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Grade</label>
                      <select 
                        id="grade" 
                        name="grade" 
                        value={editForm.grade} 
                        onChange={handleEditFormChange} 
                        className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          background: 'var(--panel)', 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          color: 'var(--text)'
                        }}
                      >
                        <option value="6th">6th Grade</option>
                        <option value="7th">7th Grade</option>
                        <option value="8th">8th Grade</option>
                        <option value="9th">9th Grade</option>
                        <option value="10th">10th Grade</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>School</label>
                      <input 
                        type="text" 
                        id="school" 
                        name="school" 
                        value={editForm.school} 
                        onChange={handleEditFormChange} 
                        className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                        style={{ 
                          background: 'var(--panel)', 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          color: 'var(--text)'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-6 py-3 rounded-2xl font-semibold transition-all duration-200 hover:shadow-md"
                      style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text)' }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile} 
                      className="px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 hover:shadow-lg"
                      style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{profile.ecoPoints}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Eco Points</div>
                  </div>
                  <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#0284c7' }}>{profile.level}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Level</div>
                  </div>
                  <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#ca8a04' }}>{profile.badges.length}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Badges</div>
                  </div>
                  <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#ef4444' }}>{profile.achievements.filter(a => a.completed).length}/{profile.achievements.length}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Achievements</div>
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>

            {/* Badges Section */}
            <div className="rounded-3xl p-8" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>🏆 Your Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="p-4 rounded-2xl border transition-all hover:shadow-md" style={{ background: 'rgba(22,163,74,0.05)', borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{badge.name}</h3>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>{badge.description}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--primary)' }}>Earned: {badge.dateEarned}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
