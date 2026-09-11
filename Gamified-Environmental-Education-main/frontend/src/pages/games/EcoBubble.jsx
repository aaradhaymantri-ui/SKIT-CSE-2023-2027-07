// src/pages/games/EcoBubble.jsx

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ITEMS = [
    { id: 0, icon: '💧', score: 2,  name: 'Droplet',      fact: "Water covers 71% of Earth's surface." },
    { id: 1, icon: '🌱', score: 5,  name: 'Sprout',       fact: 'Plants absorb CO₂ and release O₂.' },
    { id: 2, icon: '🪴', score: 10, name: 'Potted Plant', fact: 'Potted plants improve air quality.' },
    { id: 3, icon: '🌳', score: 20, name: 'Tree',         fact: 'A mature tree absorbs 48 lbs CO₂/yr.' },
    { id: 4, icon: '♻️', score: 40, name: 'Recycle',      fact: 'Recycling one can saves energy.' },
    { id: 5, icon: '🔆', score: 80, name: 'Solar Panel',  fact: 'Solar power cuts greenhouse gases.' },
    { id: 6, icon: '🌬️', score: 160,name: 'Wind Turbine', fact: 'Wind energy is fastest-growing.' },
    { id: 7, icon: '🌎', score: 320,name: 'Planet',       fact: 'Protect biodiversity.' },
];

const WIDTH = 400, HEIGHT = 520;
const GRAVITY = 0.3;
const INITIAL_TIME = 45;

export default function EcoBubble() {
    const canvasRef = useRef();
    const navigate = useNavigate();

    const [balls, setBalls]     = useState([]);
    const [timer, setTimer]     = useState(INITIAL_TIME);
    const [score, setScore]     = useState(0);
    const [next, setNext]       = useState(ITEMS[0]);
    const [fact, setFact]       = useState('');
    const [over, setOver]       = useState(false);
    const [message, setMessage] = useState('');

    // Restart game function wrapped in useCallback
    const restartGame = useCallback(() => {
        setBalls([]);
        setTimer(INITIAL_TIME);
        setScore(0);
        setNext(ITEMS[0]);
        setFact('');
        setOver(false);
        setMessage('');
    }, []);

    // Countdown timer
    useEffect(() => {
        if (over) return;
        const id = setInterval(() => {
            setTimer(t => {
                if (t <= 1) {
                    clearInterval(id);
                    setOver(true);
                    setMessage("Time's Up!");
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [over]);

    // Physics & render loop
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        let animId;

        const loop = () => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            // Update physics
            balls.forEach(b => {
                b.vy += GRAVITY;
                b.x += b.vx;
                b.y += b.vy;

                // Floor collision
                if (b.y + b.r > HEIGHT) {
                    b.y  = HEIGHT - b.r;
                    b.vy = 0;
                    b.vx *= 0.98;
                }
                // Wall collisions
                if (b.x - b.r < 0)      { b.x = b.r;         b.vx *= -1; }
                if (b.x + b.r > WIDTH)  { b.x = WIDTH - b.r; b.vx *= -1; }
            });

            // Collisions & merges
            for (let i = 0; i < balls.length; i++) {
                for (let j = i + 1; j < balls.length; j++) {
                    const A = balls[i], B = balls[j];
                    if (!A || !B) continue; // Skip if a ball was removed in a previous iteration
                    const dx = A.x - B.x, dy = A.y - B.y;
                    const dist = Math.hypot(dx, dy), minD = A.r + B.r;
                    if (dist < minD) {
                        // Resolve overlap
                        const overlap = minD - dist;
                        const nx = dx / dist, ny = dy / dist;
                        A.x += nx * overlap / 2; A.y += ny * overlap / 2;
                        B.x -= nx * overlap / 2; B.y -= ny * overlap / 2;
                        
                        // Bounce impulse
                        const dvx = A.vx - B.vx, dvy = A.vy - B.vy;
                        const dot = dvx * nx + dvy * ny;
                        if (dot < 0) {
                            const coeff = dot;
                            A.vx -= coeff * nx; A.vy -= coeff * ny;
                            B.vx += coeff * nx; B.vy += coeff * ny;
                        }

                        // Merge if same id and slow collision
                        if (A.id === B.id && A.id < ITEMS.length - 1 && Math.abs(dot) < 1) {
                            const nxt = ITEMS[A.id + 1];
                            const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
                            
                            // Create a new array without the merged balls
                            const newBalls = balls.filter((_, index) => index !== i && index !== j);
                            
                            newBalls.push({
                                id: nxt.id,
                                icon: nxt.icon,
                                r: 20 + nxt.id * 4,
                                x: mx, y: my,
                                vx: 0, vy: -5, // Give it a little "pop" upwards
                            });

                            setBalls(newBalls);
                            setScore(s => s + nxt.score);
                            setFact(nxt.fact);
                            
                            // Exit loops since the balls array has changed
                            return; 
                        }
                    }
                }
            }

            // Draw emojis
            balls.forEach(b => {
                ctx.font = `${b.r * 1.5}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(b.icon, b.x, b.y);
            });

            animId = requestAnimationFrame(loop);
        };

        animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animId);
    }, [balls]);

    // Drop handler
    const drop = () => {
        if (over) return;
        const r = 20 + next.id * 4;
        const x = r + Math.random() * (WIDTH - 2 * r);
        setBalls(bs => [
            ...bs,
            { id: next.id, icon: next.icon, r, x, y: r, vx: (Math.random() - 0.5) * 2, vy: 0 }
        ]);
        setNext(ITEMS[Math.floor(Math.random() * 4)]);
    };
    
    return (
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen select-none">
            {/* Header */}
            <div className="flex space-x-4 mb-2">
                <div className="bg-white px-4 py-2 rounded-full shadow">Score: {score}</div>
                <div className="bg-white px-4 py-2 rounded-full shadow">Time: {timer}s</div>
                <button
                    onClick={drop}
                    className="bg-white px-3 py-2 rounded-full shadow flex items-center space-x-1 hover:bg-green-100 transition"
                >
                    <span className="text-2xl">{next.icon}</span>
                    <span>Next</span>
                </button>
            </div>

            {/* Learning Fact */}
            {fact && <div className="mb-2 italic text-green-700">💡 {fact}</div>}

            {/* Game Canvas */}
            <canvas
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
                className="border-4 border-green-200 rounded-xl shadow-lg cursor-pointer"
                onClick={drop}
            />

            {/* Merge Rules Card */}
            <div className="mt-6 w-[420px] bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Merge Rules</h2>
                <div className="space-y-4">
                    {ITEMS.slice(0, ITEMS.length - 1).map(it => (
                        <div
                            key={it.id}
                            className="flex items-center justify-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition"
                        >
                            <span className="text-3xl">{it.icon}</span>
                            <span className="text-2xl font-semibold">＋</span>
                            <span className="text-3xl">{it.icon}</span>
                            <span className="text-2xl font-semibold">→</span>
                            <span className="text-3xl">{ITEMS[it.id + 1].icon}</span>
                            <span className="ml-2 text-sm text-gray-600">({ITEMS[it.id + 1].name})</span>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-center text-gray-600">
                    Goal: Merge up to <span className="text-3xl">{ITEMS[7].icon}</span>{' '}
                    <strong>Planet</strong> without stacking to the top!
                </p>
            </div>

            {/* Game Over Card */}
            {over && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-red-600 mb-2">Game Over!</h1>
                            <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="mb-8">
                            <div className="text-6xl font-bold text-green-600 mb-2">{score}</div>
                            <p className="text-gray-600 text-lg">Final Score</p>
                            <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                <p className="text-green-700 font-semibold">🌟 Great effort protecting the environment!</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={restartGame}
                                className="w-full px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                                🎮 Play Again
                            </button>
                            <button
                                onClick={() => navigate('/games')}
                                className="w-full px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                                🏠 Back to Games
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}