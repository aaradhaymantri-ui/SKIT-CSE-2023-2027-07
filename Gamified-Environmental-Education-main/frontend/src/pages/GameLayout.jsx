import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StudHeader from '../components/StudHeader';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground.jsx';

function NavigationSection() {
  return (
    <nav
      className="px-4 py-4 rounded-t-3xl mt-4 shadow-lg"
      style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/studentdashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/games" className="nav-link active">
              Games
            </Link>
            <Link to="/learntopics" className="nav-link">
              Learn
            </Link>
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              Quick Actions
            </div>
            <Link to="/quiz" className="nav-btn">
              Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const games = [
  {
    id: 'drag-and-drop',
    title: 'Waste Sorting Challenge',
    description: 'Learn proper waste segregation through our interactive drag and drop game.',
    route: '/draganddrop',
    emoji: '♻️',
    color: 'rgba(22,163,74,0.08)',
  },
  {
    id: 'memory-match',
    title: 'Eco Memory Match',
    description: 'Match environmental concepts and facts in this classic memory game.',
    route: '/memorymatch',
    emoji: '🧠',
    color: 'rgba(6,182,212,0.08)',
  },
  {
    id: 'eco-word-puzzle',
    title: 'Green Word Puzzle',
    description: 'Test your environmental vocabulary with our word puzzle challenges.',
    route: '/wordpuzzle',
    emoji: '🔤',
    color: 'rgba(245,158,11,0.10)',
  },
  {
    id: 'bubble-game',
    title: 'Eco Bubble Pop',
    description: 'Pop the bubbles to answer eco-questions and improve your knowledge.',
    route: '/ecobubble',
    emoji: '🫧',
    color: 'rgba(139,69,19,0.08)',
  },
  {
    id: 'eco-catchers',
    title: 'EcoCatchers',
    description: 'Catch trees, water, and plants while avoiding harmful waste to save the environment and boost your score!',
    route: '/ecocatcher',
    emoji: '🌿',
    color: 'rgba(46,125,50,0.1)',
  },
  {
    id: 'eco-popper',
    title: 'Eco-Popper',
    description: 'Pop eco-friendly bubbles to save nature and learn fun environmental facts while avoiding harmful ones!',
    route: '/ecopopper',
    emoji: '🌱',
    color: 'rgba(34,139,34,0.1)',
  },
];

export default function Games() {
  const [activeTab] = useState('games');
  const user = { name: 'Ruchikesha', ecoPoints: 1250 };

  return (
    <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <AnimatedBackground />
      <div className="flex flex-col relative z-10">
        <StudHeader user={user} activeTab={activeTab} />
        <NavigationSection />
        <main
          className="flex-1 bg-transparent rounded-t-3xl -mt-4 pt-8"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))',
          }}
        >
          <div className="container mx-auto px-6 py-6 space-y-6" style={{ maxWidth: '1200px' }}>
            {/* Hero Banner */}
            <section
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                  <span role="img" aria-label="game controller">
                    🎮
                  </span>{' '}
                  Eco Games Hub{' '}
                  <span role="img" aria-label="earth globe">
                    🌍
                  </span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted)' }}>
                  Play fun games while learning about environmental sustainability
                </p>
              </div>
            </section>

            {/* Games Grid */}
            <div
              className="rounded-3xl p-6 sm:p-8"
              style={{
                background: 'var(--panel)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 8px 24px rgba(22,163,74,0.06)',
              }}
            >
              <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text)' }}>
                Choose Your Game
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="group rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ background: game.color, borderColor: 'rgba(0,0,0,0.06)' }}
                  >
                    <div className="text-center">
                      <div
                        className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                        role="img"
                        aria-label={game.title + ' emoji'}
                      >
                        {game.emoji}
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                        {game.title}
                      </h3>
                      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                        {game.description}
                      </p>
                      <Link to={game.route}>
                        <button
                          className="px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                          style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
                        >
                          🎯 Play Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="text-3xl mb-2" role="img" aria-label="game controller emoji">
                  🎮
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {games.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  Games Available
                </div>
              </div>
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="text-3xl mb-2" role="img" aria-label="timer emoji">
                  ⏱️
                </div>
                <div className="text-2xl font-bold" style={{ color: '#0284c7' }}>
                  5-10
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  Minutes per Game
                </div>
              </div>
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <div className="text-3xl mb-2" role="img" aria-label="trophy emoji">
                  🏆
                </div>
                <div className="text-2xl font-bold" style={{ color: '#ca8a04' }}>
                  +25
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  Eco-Points per Game
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

NavigationSection.propTypes = {};
