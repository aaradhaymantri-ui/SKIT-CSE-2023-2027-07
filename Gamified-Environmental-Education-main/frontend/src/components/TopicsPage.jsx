import React, { useState } from "react";
import StudHeader from './StudHeader';
import { Link } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground.jsx";

// Navigation Section
function NavigationSection() {
  return (
    <nav className="px-4 py-4 rounded-t-3xl mt-4 shadow-lg" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/studentdashboard" className="nav-link">Dashboard</Link>
            <Link to="/games" className="nav-link">Games</Link>
            <Link to="/learntopics" className="nav-link active">Learn</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
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

const topicEmojis = {
  "Climate Change": "🌍",
  "Renewable Energy": "⚡",
  "Water Conservation": "💧",
  "Waste Management": "♻️",
  "Biodiversity": "🌿",
  "Sustainable Living": "🏡",
  "Ocean Conservation": "🌊",
  "Air Quality": "🌬️"
};

export default function TopicsPage({ topics, onTopicSelect }) {
  const [activeTab, setActiveTab] = useState("learn");
  const user = { name: "Ruchikesha", ecoPoints: 1250 };

  return (
    <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <AnimatedBackground />
      <div className="flex flex-col relative z-10">
        <StudHeader user={user} activeTab={activeTab} />
        <NavigationSection />
        <main className="flex-1 bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
          <div className="container mx-auto px-6 py-6 space-y-6" style={{ maxWidth: '1200px' }}>
            {/* Hero Banner */}
            <section className="rounded-3xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                  📚 Choose Your Learning Topic 🌱
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted)' }}>
                  Explore environmental topics and expand your eco-knowledge
                </p>
              </div>
            </section>

            {/* Topics Grid */}
            <div className="rounded-3xl p-6 sm:p-8" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
              <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text)' }}>Select a Topic to Begin</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => onTopicSelect(topic)}
                    className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ 
                      background: 'rgba(22,163,74,0.05)', 
                      borderColor: 'rgba(0,0,0,0.06)',
                      ':hover': { background: 'rgba(22,163,74,0.1)' }
                    }}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {topicEmojis[topic] || "📖"}
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                        {topic}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Click to start learning
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>8</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>Topics Available</div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-2xl font-bold" style={{ color: '#0284c7' }}>15-20</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>Minutes per Topic</div>
              </div>
              <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold" style={{ color: '#ca8a04' }}>+50</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>Eco-Points per Topic</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
