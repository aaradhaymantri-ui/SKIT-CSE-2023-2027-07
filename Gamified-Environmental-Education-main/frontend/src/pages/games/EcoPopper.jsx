import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


const BUBBLES_DATA = [
  // Good Environmental Actions
  { type: 'good', icon: '🌳', fact: 'Trees are Earth\'s superheroes! One tree produces oxygen for 2 people daily and absorbs 48 pounds of CO2 yearly.', name: 'Tree', points: 15 },
  { type: 'good', icon: '💧', fact: 'Wetlands are nature\'s water filters! They clean dirty water and provide homes for frogs and fish.', name: 'Clean Water', points: 12 },
  { type: 'good', icon: '🐟', fact: 'Coral reefs are underwater cities! They provide homes for 25% of all ocean creatures.', name: 'Coral Reef', points: 18 },
  { type: 'good', icon: '🐝', fact: 'Bees are tiny heroes! They help make 1 out of every 3 bites of food we eat by pollinating plants.', name: 'Busy Bee', points: 20 },
  { type: 'good', icon: '🐦', fact: 'Birds are nature\'s gardeners! They spread seeds everywhere they fly, growing new forests.', name: 'Flying Bird', points: 14 },
  { type: 'good', icon: '♻️', fact: 'Recycling is magic! One recycled can saves enough energy to power a TV for 3 hours!', name: 'Recycling', points: 16 },
  { type: 'good', icon: '🌞', fact: 'Solar panels turn sunlight into electricity! The sun gives us more energy in 1 hour than the world uses all year.', name: 'Solar Power', points: 18 },
  { type: 'good', icon: '🚴', fact: 'Bicycles are eco-friendly transport! Biking for 10 miles prevents 10 pounds of CO2 pollution.', name: 'Bicycle', points: 12 },
  { type: 'good', icon: '🌱', fact: 'Plants are air purifiers! Even small houseplants can clean the air in your room.', name: 'Green Plant', points: 10 },
  { type: 'good', icon: '💨', fact: 'Wind turbines make clean energy! One wind turbine can power 1,500 homes with zero pollution.', name: 'Wind Power', points: 16 },

  // Bad Environmental Problems
  { type: 'bad', icon: '🏭', fact: 'Factory smoke pollutes our air and causes climate change. We need cleaner factories!', name: 'Factory Pollution', points: -8 },
  { type: 'bad', icon: '🚗', fact: 'Cars that burn gas create smog and make the air dirty. Electric cars are much better!', name: 'Gas Car', points: -6 },
  { type: 'bad', icon: '🛢', fact: 'Oil spills hurt ocean animals and plants. Clean energy is safer for everyone!', name: 'Oil Spill', points: -10 },
  { type: 'bad', icon: '🌡', fact: 'Heat waves are getting stronger because of climate change. We must protect our planet!', name: 'Extreme Heat', points: -7 },
  { type: 'bad', icon: '🧊', fact: 'Melting ice makes sea levels rise, flooding coastal homes. Polar bears need our help!', name: 'Melting Ice', points: -9 },
  { type: 'bad', icon: '🗑', fact: 'Trash in nature hurts animals who might eat it by mistake. Always throw trash in bins!', name: 'Litter', points: -5 },
  { type: 'bad', icon: '🥤', fact: 'Plastic bottles take 450 years to disappear! Use reusable water bottles instead.', name: 'Plastic Waste', points: -6 },
  { type: 'bad', icon: '💨', fact: 'Air pollution makes it hard to breathe and hurts our lungs. We need cleaner air!', name: 'Smog', points: -7 },
  { type: 'bad', icon: '☠️', fact: 'Chemical waste poisons soil and water. Proper disposal keeps everyone safe!', name: 'Toxic Chemicals', points: -12 },
];

const ACHIEVEMENTS = [
  { id: 'first_pop', title: '🎈 First Pop!', desc: 'Popped your first bubble!', unlocked: false },
  { id: 'eco_warrior', title: '🌿 Eco Warrior', desc: 'Saved 10 good bubbles!', unlocked: false },
  { id: 'perfect_streak', title: '⚡ Perfect Streak', desc: 'Popped 5 good bubbles in a row!', unlocked: false },
  { id: 'fact_collector', title: '🧠 Fact Collector', desc: 'Learned 10 environmental facts!', unlocked: false },
  { id: 'speed_demon', title: '🚀 Speed Demon', desc: 'Survived speed level 5!', unlocked: false },
  { id: 'planet_protector', title: '🌍 Planet Protector', desc: 'Scored over 500 points!', unlocked: false },
];

const ENCOURAGING_MESSAGES = [
  "🌟 Great job protecting the environment!",
  "🎉 You're becoming an eco-hero!",
  "💚 Every action helps save our planet!",
  "🌱 You're making a difference!",
  "⭐ Fantastic environmental awareness!",
  "🦋 Nature thanks you for caring!",
];

const Game = () => {
  // Game State
  const [bubbles, setBubbles] = useState([]);
  const [hearts, setHearts] = useState(5); // Reduced for child-friendly difficulty
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(0.8); // Slower start for kids
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Extended time for kids
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Educational & UI State
  const [summary, setSummary] = useState({ saved: 0, wasted: 0, facts: new Set() });
  const [showModal, setShowModal] = useState(false);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [newAchievement, setNewAchievement] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState([]);

  const navigate = useNavigate();

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Create particle effect
  const createParticles = useCallback((x, y, type) => {
    const newParticles = [];
    const particleCount = type === 'good' ? 8 : 4;
    const colors = type === 'good' ? ['#10B981', '#34D399', '#6EE7B7'] : ['#EF4444', '#F87171', '#FCA5A5'];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        type: type
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1000);
  }, []);

  // Check achievements
  const checkAchievements = useCallback((newScore, newSaved, factCount, newStreak, currentLevel) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;
      
      let shouldUnlock = false;
      switch (achievement.id) {
        case 'first_pop':
          shouldUnlock = newSaved >= 1;
          break;
        case 'eco_warrior':
          shouldUnlock = newSaved >= 10;
          break;
        case 'perfect_streak':
          shouldUnlock = newStreak >= 5;
          break;
        case 'fact_collector':
          shouldUnlock = factCount >= 10;
          break;
        case 'speed_demon':
          shouldUnlock = currentLevel >= 5;
          break;
        case 'planet_protector':
          shouldUnlock = newScore >= 500;
          break;
      }
      
      if (shouldUnlock) {
        setNewAchievement(achievement);
        setTimeout(() => setNewAchievement(null), 3000);
        return { ...achievement, unlocked: true };
      }
      
      return achievement;
    }));
  }, []);

  // Show encouraging message
  const showEncouragement = useCallback(() => {
    const message = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
    setEncouragingMessage(message);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
  }, []);

  // Game over effect
  useEffect(() => {
    if (gameOver) {
      setBubbles([]);
      setTimeout(() => setShowModal(true), 500);
    }
  }, [gameOver]);

  // Level progression
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setGameSpeed(prev => Math.min(prev + 0.2, 3)); // Cap max speed
      showEncouragement();
    }
  }, [score, level, showEncouragement]);

  // Bubble spawning
  useEffect(() => {
    if (gameOver || !gameStarted || isPaused) return;
    
    const spawnRate = Math.max(1000 - (level * 100), 600);
    const bubbleSpawner = setInterval(() => {
      // Ensure good bubble ratio for kids (60% good, 40% bad)
      const isGoodBubble = Math.random() < 0.6;
      const availableBubbles = BUBBLES_DATA.filter(b => b.type === (isGoodBubble ? 'good' : 'bad'));
      const randomBubble = availableBubbles[Math.floor(Math.random() * availableBubbles.length)];
      
      const newBubble = {
        ...randomBubble,
        id: Math.random(),
        x: Math.floor(Math.random() * (window.innerWidth - 120)),
        y: window.innerHeight + 50,
        scale: 0.5 + Math.random() * 0.5, // Varied sizes
        rotation: Math.random() * 360,
        wobble: Math.random() * 2 - 1,
      };
      setBubbles(prev => [...prev, newBubble]);
    }, spawnRate);
    
    return () => clearInterval(bubbleSpawner);
  }, [gameOver, gameStarted, isPaused, level]);

  // Bubble movement with animation
  useEffect(() => {
    if (gameOver || !gameStarted || isPaused) return;
    
    const gameLoop = setInterval(() => {
      setBubbles(prev =>
        prev
          .map(bubble => ({
            ...bubble,
            y: bubble.y - (2 + gameSpeed),
            x: bubble.x + Math.sin(bubble.y * 0.01) * bubble.wobble,
            rotation: bubble.rotation + (bubble.type === 'good' ? 2 : -2),
            scale: bubble.scale + Math.sin(bubble.y * 0.02) * 0.05,
          }))
          .filter(bubble => {
            if (bubble.y < -100) {
              if (bubble.type === 'good') {
                setHearts(h => Math.max(0, h - 1));
                setSummary(s => ({ ...s, wasted: s.wasted + 1 }));
                setStreak(0); // Reset streak on missed good bubble
              }
              return false;
            }
            return true;
          })
      );
    }, 30);
    
    return () => clearInterval(gameLoop);
  }, [gameOver, gameStarted, isPaused, gameSpeed]);

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return;
    
    const particleLoop = setInterval(() => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.5, // Gravity
          life: particle.life - 0.02,
        })).filter(particle => particle.life > 0)
      );
    }, 16);
    
    return () => clearInterval(particleLoop);
  }, [particles]);

  // Heart check
  useEffect(() => {
    if (hearts <= 0 && gameStarted) setGameOver(true);
  }, [hearts, gameStarted]);

  // Timer countdown
  useEffect(() => {
    if (gameOver || !gameStarted || isPaused) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timerInterval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft, gameOver, gameStarted, isPaused]);

  // Handle bubble click
  const handleBubbleClick = useCallback((bubbleId, bubbleType, fact, points, bubbleX, bubbleY) => {
    setBubbles(prev =>
      prev.filter(bubble => {
        if (bubble.id === bubbleId) {
          // Create particle effect at bubble position
          createParticles(bubbleX, window.innerHeight - bubbleY, bubbleType);
          
          if (bubbleType === 'good') {
            setScore(s => s + points);
            setStreak(prev => {
              const newStreak = prev + 1;
              if (newStreak > bestStreak) setBestStreak(newStreak);
              return newStreak;
            });
            setSummary(s => {
              const newSummary = {
                ...s,
                saved: s.saved + 1,
                facts: new Set(s.facts).add(fact)
              };
              
              // Check achievements
              checkAchievements(score + points, newSummary.saved, newSummary.facts.size, streak + 1, level);
              
              return newSummary;
            });
            
            // Show fact modal for educational content
            setCurrentFact(fact);
            setShowFactModal(true);
            setTimeout(() => setShowFactModal(false), 2500);
            
            // Show encouragement every 5 good pops
            if ((summary.saved + 1) % 5 === 0) {
              showEncouragement();
            }
            
          } else {
            setHearts(h => Math.max(0, h - 1));
            setScore(s => Math.max(0, s + points)); // points is negative for bad bubbles
            setStreak(0); // Reset streak
            setSummary(s => ({ ...s, wasted: s.wasted + 1 }));
          }
          return false;
        }
        return true;
      })
    );
  }, [score, streak, bestStreak, summary.saved, level, createParticles, checkAchievements, showEncouragement]);

  // Game controls
  const startGame = () => setGameStarted(true);
  const pauseGame = () => setIsPaused(!isPaused);
  
  const initializeGame = () => {
    setBubbles([]);
    setHearts(5);
    setScore(0);
    setGameSpeed(0.8);
    setLevel(1);
    setGameOver(false);
    setGameStarted(false);
    setIsPaused(false);
    setTimeLeft(90);
    setStreak(0);
    setSummary({ saved: 0, wasted: 0, facts: new Set() });
    setShowModal(false);
    setShowFactModal(false);
    setParticles([]);
  };

  const getScoreGrade = () => {
    if (score >= 800) return { grade: 'A+', message: '🏆 Environmental Champion!', color: '#10B981' };
    if (score >= 600) return { grade: 'A', message: '🌟 Eco Hero!', color: '#059669' };
    if (score >= 400) return { grade: 'B+', message: '🌱 Nature Guardian!', color: '#34D399' };
    if (score >= 200) return { grade: 'B', message: '🌿 Earth Friend!', color: '#6EE7B7' };
    return { grade: 'C', message: '🌍 Keep Learning!', color: '#A7F3D0' };
  };

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-green-400 to-emerald-500">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">🫧</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Eco-Popper Adventure!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Help save the planet by popping the GREEN bubbles! 🌱
            <br />
            Learn amazing facts about nature while you play!
          </p>
          <div className="bg-green-50 p-4 rounded-2xl mb-6 text-left">
            <h3 className="font-bold text-green-700 mb-2">How to Play:</h3>
            <ul className="text-sm text-green-600 space-y-1">
              <li>🟢 Click GREEN bubbles to save the environment!</li>
              <li>🔴 Avoid RED bubbles - they harm nature!</li>
              <li>💡 Learn cool facts with every good bubble!</li>
              <li>🏆 Unlock achievements as you play!</li>
              <li>❤️ Don't let your hearts run out!</li>
            </ul>
          </div>
          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            🎮 Start Adventure!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-blue-200 to-emerald-200 overflow-hidden">
      
      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none z-30"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}

      {/* Game Header */}
      <header className="flex justify-between items-center p-4 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[...Array(hearts)].map((_, i) => (
              <span key={i} className="text-2xl animate-pulse">❤️</span>
            ))}
            {[...Array(5 - hearts)].map((_, i) => (
              <span key={i} className="text-2xl opacity-30">💔</span>
            ))}
          </div>
          <div className="text-sm text-gray-600">Level {level}</div>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🌍 Eco-Popper
          </h1>
          <div className="text-lg font-semibold text-green-600">Score: {score}</div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">⏱️ {formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-600">Streak: {streak}</div>
          </div>
          <button
            onClick={pauseGame}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>
        </div>
      </header>

      {/* Bubbles Area */}
      <div className="relative h-screen overflow-hidden">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 ${
              bubble.type === 'good' ? 'hover:shadow-green-400' : 'hover:shadow-red-400'
            } hover:shadow-lg`}
            style={{ 
              left: bubble.x, 
              bottom: bubble.y,
              transform: `scale(${bubble.scale}) rotate(${bubble.rotation}deg)`,
            }}
            onClick={() => handleBubbleClick(bubble.id, bubble.type, bubble.fact, bubble.points, bubble.x, bubble.y)}
          >
            <div className={`
              w-20 h-20 rounded-full flex flex-col items-center justify-center text-center shadow-lg backdrop-blur-sm border-2 transition-all
              ${bubble.type === 'good' 
                ? 'bg-gradient-to-br from-green-300 to-emerald-400 border-green-500 hover:from-green-400 hover:to-emerald-500' 
                : 'bg-gradient-to-br from-red-300 to-rose-400 border-red-500 hover:from-red-400 hover:to-rose-500'
              }
            `}>
              <span className="text-2xl mb-1">{bubble.icon}</span>
              <span className="text-xs font-bold text-white leading-tight px-1">
                {bubble.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Educational Fact Modal */}
      {showFactModal && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 max-w-md">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-white animate-bounce">
            <div className="text-center">
              <div className="text-2xl mb-2">💡</div>
              <p className="font-bold text-sm leading-relaxed">{currentFact}</p>
            </div>
          </div>
        </div>
      )}

      {/* Encouraging Message */}
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl shadow-2xl animate-pulse">
            <p className="font-bold text-lg">{encouragingMessage}</p>
          </div>
        </div>
      )}

      {/* New Achievement */}
      {newAchievement && (
        <div className="fixed top-20 right-4 z-40 animate-slide-in-right">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-white">
            <div className="text-center">
              <div className="text-2xl mb-1">🏆</div>
              <p className="font-bold">{newAchievement.title}</p>
              <p className="text-sm">{newAchievement.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
            <button
              onClick={pauseGame}
              className="px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
            >
              ▶️ Continue Playing
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="text-6xl mb-4">{getScoreGrade().grade === 'A+' ? '🏆' : getScoreGrade().grade === 'A' ? '🌟' : '🌱'}</div>
            
            <h2 className="text-3xl font-bold mb-2" style={{ color: getScoreGrade().color }}>
              {getScoreGrade().message}
            </h2>
            
            <div className="text-xl mb-6">
              Grade: <span className="font-bold" style={{ color: getScoreGrade().color }}>{getScoreGrade().grade}</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-600">Final Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{level}</div>
                  <div className="text-sm text-gray-600">Level Reached</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{summary.saved}</div>
                  <div className="text-sm text-gray-600">Environment Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{bestStreak}</div>
                  <div className="text-sm text-gray-600">Best Streak</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">🏆 Your Achievements:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {achievements.filter(a => a.unlocked).map(achievement => (
                  <div key={achievement.id} className="bg-yellow-100 p-2 rounded-lg">
                    <div className="font-bold text-yellow-800">{achievement.title}</div>
                  </div>
                ))}
                {achievements.filter(a => a.unlocked).length === 0 && (
                  <div className="col-span-2 text-gray-500 italic">Play more to unlock achievements!</div>
                )}
              </div>
            </div>

            {/* Environmental Facts Learned */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">📚 Environmental Facts You Learned:</h3>
              <div className="max-h-32 overflow-y-auto bg-green-50 p-3 rounded-lg text-left text-sm">
                {Array.from(summary.facts).map((fact, index) => (
                  <p key={index} className="mb-2 text-green-700">• {fact}</p>
                ))}
                {summary.facts.size === 0 && (
                  <p className="text-gray-500 italic text-center">Pop green bubbles to learn amazing facts!</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={initializeGame}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                🎮 Play Again
              </button>
              <button
                onClick={() => navigate('/Games')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                🏠 Back to Games
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Game;