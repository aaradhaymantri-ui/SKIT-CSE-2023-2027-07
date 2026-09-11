import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useSound from "use-sound";
import wrongSound from "../assets/sounds/wrong.mp3"
import correctSound from "../assets/sounds/correct.mp3";
import { motion, AnimatePresence } from "framer-motion";
import StudHeader from '../components/StudHeader';
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import "../styles/Quiz.css";

// 20 Questions
const allQuestions = [
  {
    category: "🌳 Forest",
    question: "Which district in Punjab faces the most deforestation?",
    options: ["Ludhiana", "Pathankot", "Amritsar", "Hoshiarpur"],
    answer: 3,
    explanation:
      "Hoshiarpur has seen significant deforestation due to development.",
  },
  {
    category: "💧 Water",
    question: "What is the main cause of groundwater depletion in Punjab?",
    options: ["Rainfall", "Over-irrigation", "Industrial waste", "Floods"],
    answer: 1,
    explanation: "Over-irrigation for crops has led to groundwater depletion.",
  },
  {
    category: "🏭 Pollution",
    question: "Which practice causes severe winter air pollution in Punjab?",
    options: [
      "Vehicle smoke",
      "Stubble burning",
      "Plastic waste",
      "Brick kilns",
    ],
    answer: 1,
    explanation: "Stubble burning is the major cause of winter smog in Punjab.",
  },
  {
    category: "🏗️ Man-made",
    question: "Which city in Punjab faces high industrial pollution?",
    options: ["Patiala", "Ludhiana", "Bathinda", "Ferozepur"],
    answer: 1,
    explanation:
      "Ludhiana is highly polluted due to textile and dye industries.",
  },
  {
    category: "💧 Water",
    question: "Which river in Punjab is most polluted?",
    options: ["Sutlej", "Beas", "Ravi", "Ghaggar"],
    answer: 0,
    explanation: "Sutlej river is heavily polluted by industrial effluents.",
  },
  {
    category: "🌳 Forest",
    question: "Forests in Punjab mainly exist in?",
    options: ["Plains", "Hills", "Urban areas", "Desert"],
    answer: 1,
    explanation: "Punjab's forests are mostly in the Shivalik hills region.",
  },
  {
    category: "🏭 Pollution",
    question: "Which gas causes smog in Punjab winters?",
    options: [
      "Carbon dioxide",
      "Sulphur dioxide",
      "Nitrogen oxides",
      "Methane",
    ],
    answer: 2,
    explanation: "Nitrogen oxides mix with other gases to cause smog.",
  },
  {
    category: "🏗️ Man-made",
    question: "What is a major man-made problem in Punjab cities?",
    options: ["Overpopulation", "Illegal mining", "Sandstorms", "Landslides"],
    answer: 1,
    explanation: "Illegal sand mining is a big issue in Punjab rivers.",
  },
  {
    category: "💧 Water",
    question: "Why is Punjab's water table falling rapidly?",
    options: [
      "Overuse of tube wells",
      "Less rainfall",
      "Industrial demand",
      "Climate change",
    ],
    answer: 0,
    explanation: "Excess use of tube wells for paddy is the main reason.",
  },
  {
    category: "🌳 Forest",
    question: "Which project aims at increasing green cover in Punjab?",
    options: [
      "Mission Green Punjab",
      "Van Mahotsav",
      "Eco Punjab",
      "Harit Bharat",
    ],
    answer: 0,
    explanation: "Mission Green Punjab focuses on afforestation.",
  },
  {
    category: "🌳 Forest",
    question: "Which forest in Punjab is protected?",
    options: [
      "Abohar Wildlife Sanctuary",
      "Harike Wetland",
      "Chandigarh Forest",
      "Patiala Reserve",
    ],
    answer: 0,
    explanation: "Abohar Wildlife Sanctuary is protected.",
  },
  {
    category: "💧 Water",
    question: "Which water conservation technique is used in Punjab?",
    options: ["Rainwater harvesting", "Dams", "Desalination", "None"],
    answer: 0,
    explanation: "Rainwater harvesting is widely encouraged.",
  },
  {
    category: "🏭 Pollution",
    question: "Main source of industrial pollution in Ludhiana?",
    options: ["Textiles", "Sugar mills", "Cement", "Electronics"],
    answer: 0,
    explanation: "Textile industries pollute air and water.",
  },
  {
    category: "🏗️ Man-made",
    question: "Major traffic problem in Punjab cities?",
    options: ["Congestion", "Accidents", "Noise", "All"],
    answer: 3,
    explanation:
      "Traffic congestion, accidents, and noise are all major issues.",
  },
  {
    category: "💧 Water",
    question: "Which groundwater contaminant is common in Punjab?",
    options: ["Nitrate", "Lead", "Mercury", "Arsenic"],
    answer: 0,
    explanation: "Nitrate contamination is prevalent due to fertilizers.",
  },
  {
    category: "🌳 Forest",
    question: "Punjab's forest cover percentage?",
    options: ["3%", "6%", "12%", "20%"],
    answer: 1,
    explanation: "Forest cover is around 6% of total area.",
  },
  {
    category: "🏭 Pollution",
    question: "Main cause of winter smog in Punjab?",
    options: ["Stubble burning", "Vehicle emissions", "Factories", "None"],
    answer: 0,
    explanation: "Stubble burning contributes heavily to winter smog.",
  },
  {
    category: "🏗️ Man-made",
    question: "Which city has high urbanization?",
    options: ["Amritsar", "Ludhiana", "Patiala", "Bathinda"],
    answer: 1,
    explanation: "Ludhiana is highly urbanized and industrialized.",
  },
  {
    category: "💧 Water",
    question: "Which is a major water body in Punjab?",
    options: ["Sutlej", "Ganga", "Yamuna", "Brahmaputra"],
    answer: 0,
    explanation: "Sutlej is the main river flowing through Punjab.",
  },
  {
    category: "🌳 Forest",
    question: "Which is a biodiversity hotspot in Punjab?",
    options: ["Shivalik Hills", "Punjab Plains", "Chandigarh Area", "None"],
    answer: 0,
    explanation: "Shivalik Hills host most biodiversity.",
  },
];

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
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm" style={{ color: 'var(--muted)' }}>Quick Actions</div>
            <Link to="/quiz" className="nav-btn active">Quiz</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Category colors & themes
const categoryBackgrounds = {
  "🌳 Forest": { 
    color: "rgba(22,163,74,0.15)", 
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.1))",
    borderColor: "rgba(34,197,94,0.3)"
  },
  "💧 Water": { 
    color: "rgba(6,182,212,0.15)", 
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.1))",
    borderColor: "rgba(14,165,233,0.3)"
  },
  "🏭 Pollution": { 
    color: "rgba(245,158,11,0.15)", 
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))",
    borderColor: "rgba(251,191,36,0.3)"
  },
  "🏗️ Man-made": { 
    color: "rgba(139,69,19,0.15)", 
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(139,69,19,0.1))",
    borderColor: "rgba(168,85,247,0.3)"
  },
};

export default function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [playWrong] = useSound(wrongSound);
  const [playCorrect] = useSound(correctSound);

  // Start Quiz and pick 10 random questions
  const startQuiz = () => {
    const shuffled = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setQuizQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setWrongCount(0);
    setTimeLeft(15);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  useEffect(() => {
    if (quizCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, quizCompleted]);

  const handleAnswer = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = quizQuestions[current].answer;
    if (index !== correct) {
      playWrong();
      setWrongCount((prev) => prev + 1);
    } else setScore((prev) => prev + 1);
    setTimeout(() => handleNext(), 1500);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(15);
    } else {
      setQuizCompleted(true);
      playCorrect(); // applause only at end
    }
  };

  const [activeTab, setActiveTab] = useState("quiz");
  const user = { name: "Ruchikesha", ecoPoints: 1250 };

  if (quizQuestions.length === 0) return <div>Loading...</div>;
  const currentQuestion = quizQuestions[current];
  const bg = categoryBackgrounds[currentQuestion.category];

  return (
    <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <AnimatedBackground />
      <div className="flex flex-col relative z-10">
        <StudHeader user={user} activeTab={activeTab} />
        <NavigationSection />
        <main className="flex-1 bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
          <div className="container mx-auto px-6 py-6 flex items-center justify-center min-h-[80vh]" style={{ maxWidth: '1200px' }}>
            <motion.div
              className="w-full max-w-2xl rounded-3xl p-8 border-2 shadow-2xl"
              style={{
                background: bg.gradient,
                borderColor: bg.borderColor,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quiz Header */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  🧠 EcoChamps Quiz 🌍
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted)' }}>
                  Test your environmental knowledge!
                </p>
              </div>

              {!quizCompleted ? (
                <>
                  {/* Quiz Progress */}
                  <div className="flex justify-between items-center mb-6 p-4 rounded-2xl" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                      🎯 Score: {score}/10
                    </div>
                    <div className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                      Question {current + 1} / 10
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="text-center mb-6">
                    <div className="inline-block px-6 py-3 rounded-2xl font-bold text-lg" style={{ background: bg.color, border: `2px solid ${bg.borderColor}`, color: 'var(--text)' }}>
                      {currentQuestion.category}
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20">
                      <CircularProgressbar
                        value={timeLeft}
                        maxValue={15}
                        text={`${timeLeft}s`}
                        styles={buildStyles({
                          textSize: "24px",
                          pathColor: timeLeft > 5 ? "#10b981" : "#ef4444",
                          textColor: timeLeft > 5 ? "#10b981" : "#ef4444",
                          trailColor: "rgba(0,0,0,0.1)",
                        })}
                      />
                    </div>
                  </div>

                  {/* Question and Options */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-bold text-center mb-6" style={{ color: 'var(--text)' }}>
                        {currentQuestion.question}
                      </h2>
                      
                      <div className="space-y-3">
                        {currentQuestion.options.map((opt, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className="w-full p-4 rounded-2xl border-2 font-semibold text-left transition-all duration-300 hover:shadow-lg"
                            style={{
                              backgroundColor: selectedOption === null
                                ? 'var(--panel)'
                                : i === currentQuestion.answer
                                ? '#10b981'
                                : i === selectedOption
                                ? '#ef4444'
                                : 'var(--panel)',
                              borderColor: selectedOption === null
                                ? 'rgba(0,0,0,0.1)'
                                : i === currentQuestion.answer
                                ? '#10b981'
                                : i === selectedOption
                                ? '#ef4444'
                                : 'rgba(0,0,0,0.1)',
                              color: selectedOption !== null && (i === currentQuestion.answer || i === selectedOption)
                                ? '#fff'
                                : 'var(--text)',
                            }}
                            whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                            transition={{ duration: 0.2 }}
                            disabled={selectedOption !== null}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>

                      {selectedOption !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 rounded-2xl"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
                        >
                          <p className="text-center font-medium" style={{ color: 'var(--text)' }}>
                            💡 {currentQuestion.explanation}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <>
                  {/* Quiz Completion */}
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                      Quiz Completed!
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4 my-6">
                      <div className="p-4 rounded-2xl text-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                        <div className="text-2xl font-bold text-green-600">{score}</div>
                        <div className="text-sm" style={{ color: 'var(--muted)' }}>Correct Answers</div>
                      </div>
                      <div className="p-4 rounded-2xl text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                        <div className="text-2xl font-bold text-red-600">{wrongCount}</div>
                        <div className="text-sm" style={{ color: 'var(--muted)' }}>Wrong Answers</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
                      <p className="font-bold text-amber-600">+{score * 10} Eco-Points Earned! 🏆</p>
                    </div>

                    <button
                      onClick={startQuiz}
                      className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
                    >
                      🔄 Play Again
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {quizCompleted && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
