import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MemoryMatch = ({ onComplete }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);

  const environmentalPairs = [
    { name: 'Air Pollution', causeImage: '/images/factory.png', effectText: 'Air Pollution💨' },
    { name: 'Deforestation', causeImage: '/images/deforestation.png', effectText: 'Deforestation🪵' },
    { name: 'Water Pollution', causeImage: '/images/water_pollution.png', effectText: 'Water Pollution💧' },
    { name: 'Recyclable Waste', causeImage: '/images/recyclable_waste.png', effectText: 'Recyclable Waste♻️' },
    { name: 'Non-Recyclable Waste', causeImage: '/images/non_recyclable_waste.png', effectText: 'Non-Recyclable Waste' },
    { name: 'Noise Pollution', causeImage: '/images/honking_cars.png', effectText: 'Noise Pollution🚗' },
    { name: 'Renewable Energy', causeImage: '/images/solar_panels.png', effectText: 'Renewable Energy☀️' },
    { name: 'E-Waste', causeImage: '/images/e_waste.png', effectText: 'E-Waste📱' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    }
    return () => timer && clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  const initializeGame = () => {
    const gameCards = environmentalPairs.flatMap((pair, index) => [
      { id: `cause-${index}`, name: pair.name, content: <img src={pair.causeImage} alt={pair.name} className="w-full h-full object-fill p-1" />, flipped: false, matched: false },
      { id: `effect-${index}`, name: pair.name, content: pair.effectText, flipped: false, matched: false },
    ]).sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeElapsed(0);
    setScore(0);
  };

  const handleCardClick = (id) => {
    if (!gameStarted) setGameStarted(true);
    if (gameCompleted || flippedCards.length >= 2) return;

    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const updatedCards = cards.map(card => card.id === id ? { ...card, flipped: true } : card);
    setCards(updatedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(c => c.id === firstId);
      const secondCard = updatedCards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        setTimeout(() => {
          const matchedCards = updatedCards.map(c => c.id === firstId || c.id === secondId ? { ...c, matched: true } : c);
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatched = prev + 1;
            if (newMatched === environmentalPairs.length) {
              setGameCompleted(true);
              const maxMoves = environmentalPairs.length * 3;
              const moveScore = Math.max(0, 50 - Math.floor((moves / maxMoves) * 50));
              const maxTime = 120;
              const timeScore = Math.max(0, 50 - Math.floor((timeElapsed / maxTime) * 50));
              const totalScore = moveScore + timeScore;
              setScore(totalScore);
              if (typeof onComplete === 'function') onComplete(totalScore);
            }
            return newMatched;
          });
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = updatedCards.map(c => c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c);
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2,'0')}:${(seconds % 60).toString().padStart(2,'0')}`;

  if (gameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg space-y-4 max-w-md mx-auto">
        <div className="text-6xl">{score >= 80 ? '🏆' : '🌟'}</div>
        <h2 className="text-2xl font-bold text-green-700">Game Over!</h2>
        <p className="text-lg text-gray-700">Your score: <span className="font-semibold text-green-600">{score}</span> / 100</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="h-4 rounded-full bg-green-400 transition-all" style={{ width: `${score}%` }} />
        </div>
        <p className="text-gray-600">{score === 100 ? "Perfect! You matched all pairs efficiently." : "Good effort! Try to match faster next time."}</p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate('/games')}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Games
          </button>
          <button
            onClick={initializeGame}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Environmental Cause & Effect Match</h2>
      <p className="mb-4">Match environmental causes with their effects.</p>

      <div className="flex justify-between mb-4">
        <div><span className="font-bold">Moves:</span> {moves}</div>
        <div><span className="font-bold">Matched:</span> {matchedPairs}/{environmentalPairs.length}</div>
        <div><span className="font-bold">Time:</span> {formatTime(timeElapsed)}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer text-center transition-all transform
              ${card.flipped || card.matched ? 'rotate-0' : 'rotate-y-180'}
              ${card.matched ? 'bg-green-100' : card.flipped ? 'bg-blue-100' : 'bg-gray-300'}`}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.flipped || card.matched) ? (
              <div className="w-full h-full flex items-center justify-center text-sm font-semibold p-1">
                {typeof card.content === 'string' ? <p>{card.content}</p> : card.content}
              </div>
            ) : (
              <span className="text-3xl">❓</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={initializeGame}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default MemoryMatch;
