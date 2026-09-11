import React, { useState, useEffect } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(200);
  const [playerSize, setPlayerSize] = useState(60);
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [fallSpeed, setFallSpeed] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [ecoTip, setEcoTip] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);

  const gameItems = [
    { emoji: "⛽", name: "Gasoline can", value: -7, tip: "Fossil fuels pollute—opt for renewable energy!" },
    { emoji: "🔥", name: "Fuelwood", value: -10, tip: "Cutting wood releases CO₂—use efficient stoves!" },
    { emoji: "🛍", name: "Plastic bags", value: -5, tip: "Plastic lasts centuries—use reusable bags!" },
    { emoji: "🏭", name: "Factory waste", value: -12, tip: "Industrial emissions harm air—support green factories!" },
    { emoji: "🌳", name: "Tree", value: 20, tip: "Trees absorb CO₂—plant more trees!" },
    { emoji: "🌊", name: "Water", value: 15, tip: "Water is precious—fix leaks and save it!" },
    { emoji: "🪴", name: "Plant", value: 7,  tip: "Plants clean air—grow indoor plants!" },
    { emoji: "☁", name: "Cloud", value: 10, tip: "Clouds reflect heat—protect skies from pollution!" },
  ];

  // Spawn items
  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      const randomItem = gameItems[Math.floor(Math.random() * gameItems.length)];
      setItems(prev => [
        ...prev,
        { id: Date.now() + Math.random(), ...randomItem, x: Math.random() * 420, y: 0 }
      ]);
    }, 2000);
    return () => clearInterval(spawn);
  }, [gameOver]);

  // Items falling
  useEffect(() => {
    if (gameOver) return;
    const fall = setInterval(() => {
      setItems(prev => prev.map(item => ({ ...item, y: item.y + fallSpeed })));
    }, 100);
    return () => clearInterval(fall);
  }, [fallSpeed, gameOver]);

  // Collision & scoring
  useEffect(() => {
    if (gameOver) return;
    setItems(prev =>
      prev.filter(item => {
        if (item.y >= 440) {
          const caught = item.x >= playerX && item.x <= playerX + playerSize;
          if (caught) {
            // Update score & size
            setScore(s => {
              const newScore = s + item.value;
              setPlayerSize(sz => Math.max(40, Math.min(200, sz + item.value)));
              return newScore;
            });
            // Combo & tip logic
            if (item.value > 0) {
              setCombo(c => c + 1);
              setEcoTip(item.tip);
              setShowTip(true);
              setTimeout(() => setShowTip(false), 3000);
            } else {
              setCombo(0);
            }
          }
          return false;
        }
        return true;
      })
    );
  }, [items, playerX, playerSize, gameOver]);

  // Mouse movement
  useEffect(() => {
    const move = e => {
      const ga = document.getElementById("game-area");
      if (!ga) return;
      const rect = ga.getBoundingClientRect();
      let x = e.clientX - rect.left - playerSize / 2;
      x = Math.max(0, Math.min(500 - playerSize, x));
      setPlayerX(x);
    };
    const ga = document.getElementById("game-area");
    ga && ga.addEventListener("mousemove", move);
    return () => ga && ga.removeEventListener("mousemove", move);
  }, [playerSize]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const t = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, gameOver]);

  // Fall speed & level progression
  useEffect(() => {
    // Increase speed every 15s
    if (timeLeft % 15 === 0 && timeLeft !== 60) {
      setFallSpeed(fs => fs + 1);
    }
    // Simple level by score
    if (score >= level * 50) {
      setLevel(lvl => lvl + 1);
    }
  }, [timeLeft, score]);

  // Game end conditions
  useEffect(() => {
    if (gameOver) return;
    if (score >= 100) {
      setGameOver(true);
      setMessage("🏆 You learned to save the environment!");
    }
    if (score <= -30) {
      setGameOver(true);
      setMessage("⚠ Remember the environment!");
    }
  }, [score, gameOver]);

  const endGame = () => {
    setGameOver(true);
    setMessage("⏰ Time's up! Final Score: " + score);
  };

  const redirectToGames = () => {
    window.location.href = "/games";
  };

  const restartGame = () => {
    setScore(0);
    setItems([]);
    setTimeLeft(60);
    setFallSpeed(5);
    setPlayerSize(60);
    setGameOver(false);
    setMessage("");
    setCombo(0);
    setLevel(1);
  };

  const styles = {
    wrapper: { display: "flex", flexDirection: "column", alignItems: "center", padding: 20, fontFamily: "Arial" },
    header: { fontSize: "2rem", color: "#2e7d32", marginBottom: 10 },
    stat: { margin: "5px 0", fontWeight: "bold" },
    game: { position: "relative", width: 500, height: 500, background: "#000", borderRadius: 20, overflow: "hidden" },
    player: size => ({
      position: "absolute", bottom: 10, left: playerX, width: size, height: size,
      background: "radial-gradient(circle,#2e7d32,#4caf50)", borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
    }),
    item: (x, y, val) => ({
      position: "absolute", left: x, top: y,
      width: Math.max(25, Math.abs(val) * 2), height: Math.max(25, Math.abs(val) * 2),
      background: val > 0 ? "#90ee90" : "#ff6347", borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center"
    }),
    tip: { position: "absolute", top: 10, background: "#fff", padding: 10, borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" },
    gameOver: { marginTop: 20, textAlign: "center" },
    btn: { marginTop: 10, padding: "8px 16px", border: "none", borderRadius: 8, background: "#2e7d32", color: "#fff", cursor: "pointer" },
    endCard: {
      marginTop: 40,
      padding: 20,
      maxWidth: 400,
      borderRadius: 12,
      backgroundColor: "#4caf50",
      color: "white",
      textAlign: "center",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>🌿 EcoCatchers</div>
      <div style={styles.stat}>Score: {score} &nbsp;|&nbsp; Combo: {combo} &nbsp;|&nbsp; Level: {level}</div>
      <div style={styles.stat}>Time Left: {timeLeft}s</div>

      <div id="game-area" style={styles.game}>
        {items.map(item => (
          <div key={item.id} style={styles.item(item.x, item.y, item.value)}>
            {item.emoji}
          </div>
        ))}

        <div style={styles.player(playerSize)}>🌿</div>

        {showTip && <div style={styles.tip}>{ecoTip}</div>}
      </div>

      {gameOver && (
        <div style={styles.endCard}>
          <h2>Game Over!</h2>
          <p>Your final score is <strong>{score}</strong></p>
          <p>{message}</p>
          <button style={styles.btn} onClick={restartGame}>Play Again</button>
          <button style={{ ...styles.btn, marginLeft: 10, backgroundColor: "#388e3c" }} onClick={redirectToGames}>Back to Games</button>
        </div>
      )}
    </div>
  );
}
