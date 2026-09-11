import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DragAndDrop = ({ onComplete, onRequestHint }) => {
  const navigate = useNavigate();
  const [zones, setZones] = useState([]);
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');
  const [wrongItem, setWrongItem] = useState(null);
  const [correctionMessage, setCorrectionMessage] = useState('');

  // Load game data
  useEffect(() => {
    const gameData = {
      zones: [
        { id: 'recyclable', title: 'Recyclable', items: [] },
        { id: 'organic', title: 'Organic Waste', items: [] },
        { id: 'electronic', title: 'Electronic Waste', items: [] },
        { id: 'hazardous', title: 'Hazardous Waste', items: [] },
      ],
      items: [
        { id: 'item1', text: 'Plastic Bottle', category: 'recyclable', image: '/images/plastic-bottle.jpg' },
        { id: 'item2', text: 'Newspaper', category: 'recyclable', image: '/images/newspaper.jpg' },
        { id: 'item3', text: 'Glass Jar', category: 'recyclable', image: '/images/glass-jar.jpg' },
        { id: 'item4', text: 'Aluminum Can', category: 'recyclable', image: '/images/aluminum-can.jpg' },
        { id: 'item5', text: 'Fruit Peels', category: 'organic', image: '/images/fruit-peels.jpg' },
        { id: 'item6', text: 'Vegetable Scraps', category: 'organic', image: '/images/vegetable-scraps.jpg' },
        { id: 'item7', text: 'Coffee Grounds', category: 'organic', image: '/images/coffee-grounds.jpg' },
        { id: 'item8', text: 'Old Smartphone', category: 'electronic', image: '/images/old-smartphone.jpg' },
        { id: 'item9', text: 'Broken Headphones', category: 'electronic', image: '/images/broken-headphones.jpg' },
        { id: 'item10', text: 'Used Batteries', category: 'hazardous', image: '/images/used-batteries.jpg' },
        { id: 'item11', text: 'Paint Cans', category: 'hazardous', image: '/images/paint-cans.jpg' },
        { id: 'item12', text: 'Light Bulbs', category: 'hazardous', image: '/images/light-bulbs.jpg' },
      ],
      hints: {
        recyclable: 'Items that can be processed and turned into new products',
        organic: 'Natural materials that can decompose and become compost',
        electronic: 'Devices that use electricity and contain circuit boards',
        hazardous: 'Materials that are dangerous to dispose of in regular trash',
      },
    };

    setZones(gameData.zones);
    setItems(gameData.items);
    setMaxScore(gameData.items.length);
  }, []);

  // Timer
  useEffect(() => {
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameCompleted) {
      handleGameEnd();
    }
  }, [timeLeft, gameStarted, gameCompleted]);

  const handleDragStart = (item) => setDraggedItem(item);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (!draggedItem) return;

    setItems((prev) => prev.filter((item) => item.id !== draggedItem.id));

    if (draggedItem.category === zoneId) {
      setZones((prev) =>
        prev.map((zone) =>
          zone.id === zoneId
            ? { ...zone, items: [...zone.items, draggedItem] }
            : zone
        )
      );
      setScore((prev) => prev + 1);
      setWrongItem(null);
      setCorrectionMessage('');
    } else {
      // Add item to correct bin
      setZones((prev) =>
        prev.map((zone) =>
          zone.id === draggedItem.category
            ? { ...zone, items: [...zone.items, draggedItem] }
            : zone
        )
      );
      setWrongItem(draggedItem);
      const correctZone = zones.find((z) => z.id === draggedItem.category);
      setCorrectionMessage(
        `${draggedItem.text} was sorted incorrectly! It should go in the "${correctZone ? correctZone.title : draggedItem.category}" bin.`
      );
    }

    if (items.length === 1) setTimeout(() => handleGameEnd(), 500);
    setDraggedItem(null);
  };

  const handleGameStart = () => setGameStarted(true);

  const handleGameEnd = () => {
    setGameCompleted(true);
    if (typeof onComplete === 'function') onComplete(score, maxScore);
  };

  const handleRequestHint = () => {
    if (typeof onRequestHint === 'function') onRequestHint();
    const hintData = {
      recyclable: 'Items that can be processed and turned into new products',
      organic: 'Natural materials that can decompose and become compost',
      electronic: 'Devices that use electricity and contain circuit boards',
      hazardous: 'Materials that are dangerous to dispose of in regular trash',
    };
    const categories = Object.keys(hintData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setHint(hintData[randomCategory]);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-eco-dark mb-4">Waste Sorting Challenge</h2>
        <p className="text-gray-600 mb-6 text-center">
          Sort the waste items into their correct categories. Drag each item to the appropriate bin.
        </p>
        <button
          onClick={handleGameStart}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg space-y-4">
        <div className="text-6xl">{score === maxScore ? '🏆' : '🌟'}</div>
        <h2 className="text-2xl font-bold text-eco-dark">Game Over!</h2>
        <p className="text-lg text-gray-700">Your score: <span className="font-semibold text-green-600">{score}</span> / {maxScore}</p>
        <div className="w-full max-w-sm bg-gray-100 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-green-400 transition-all"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>
        <p className="text-gray-600">{score === maxScore ? "Perfect! You sorted everything correctly." : "Good effort! Keep practicing to improve your score."}</p>
        <button
          onClick={() => navigate('/games')}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mt-2"
        >
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium">Score: {score}/{maxScore}</div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-medium">Time: {formatTime(timeLeft)}</div>
          <button
            onClick={handleRequestHint}
            className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
          >
            Hint
          </button>
        </div>
      </div>

      {showHint && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">{hint}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drop Zones */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-eco-dark">Waste Bins</h3>
          {zones.map((zone) => (
            <div
              key={zone.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[150px] bg-gray-50 hover:border-eco-primary transition-colors"
            >
              <h4 className="font-medium text-eco-dark mb-2">{zone.title}</h4>
              <div className="flex flex-wrap gap-2">
                {zone.items.map((item) => (
                  <div key={item.id} className="flex flex-col items-center w-20">
                    <img src={item.image} alt={item.text} className="w-16 h-16 object-cover rounded-md" />
                    <p className="text-xs text-center mt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Items */}
        <div>
          <h3 className="text-lg font-medium text-eco-dark mb-4">Items to Sort</h3>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-wrap gap-4">
              {items.length === 0 && <p className="text-gray-500 italic">All items sorted!</p>}
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className="cursor-move flex flex-col items-center hover:scale-105 transition-transform"
                >
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                  />
                  <p className="text-xs text-center mt-1">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Wrong drop feedback */}
            {wrongItem && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3 mt-4">
                <p className="text-sm text-red-700">{correctionMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
