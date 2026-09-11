import React, { useState, useEffect } from "react";
import StudHeader from "../components/StudHeader";
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
            <Link to="/leaderboard" className="nav-link active">Leaderboard</Link>
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

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockStudents = [
        { id: "s1", name: "Aditya Sharma", avatar: "👦🏽", grade: "8th", ecoPoints: 450, badges: 5 },
        { id: "s2", name: "Priya Patel", avatar: "👧🏽", grade: "8th", ecoPoints: 520, badges: 6 },
        { id: "s3", name: "Rahul Gupta", avatar: "👦🏽", grade: "7th", ecoPoints: 380, badges: 4 },
        { id: "s4", name: "Neha Singh", avatar: "👧🏽", grade: "7th", ecoPoints: 410, badges: 5 },
        { id: "s5", name: "Ruchikesha", avatar: "👦🏽", grade: "8th", ecoPoints: 1250, badges: 7 },
        { id: "s6", name: "Ananya Desai", avatar: "👧🏽", grade: "6th", ecoPoints: 350, badges: 3 },
        { id: "s7", name: "Rohan Kapoor", avatar: "👦🏽", grade: "7th", ecoPoints: 420, badges: 4 },
        { id: "s8", name: "Meera Joshi", avatar: "👧🏽", grade: "8th", ecoPoints: 480, badges: 5 },
        { id: "s9", name: "Arjun Kumar", avatar: "👦🏽", grade: "6th", ecoPoints: 320, badges: 3 },
        { id: "s10", name: "Kavya Sharma", avatar: "👧🏽", grade: "7th", ecoPoints: 400, badges: 4 },
      ];

      const sortedStudents = [...mockStudents].sort((a, b) => b.ecoPoints - a.ecoPoints);
      sortedStudents.forEach((s, i) => (s.rank = i + 1));

      setStudents(sortedStudents);
      setCurrentUser(sortedStudents.find((s) => s.id === "s5") || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
    setLoading(true);
  };

  return (
    <div className="min-h-screen font-sans relative" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <AnimatedBackground />
      <div className="flex flex-col overflow-hidden relative z-10">
        <StudHeader user={currentUser || { name: "Ruchikesha", ecoPoints: 1250, badges: 7 }} activeTab="leaderboard" />
        <NavigationSection />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent rounded-t-3xl -mt-4 pt-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.02), rgba(6,182,212,0.02))' }}>
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
            {/* Hero Banner */}
            <section className="rounded-3xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                  🏆 Eco Champions Leaderboard 🌟
                </h1>
                <p className="text-lg" style={{ color: 'var(--muted)' }}>
                  See who's making the biggest environmental impact!
                </p>
              </div>
            </section>

            {/* Time Filter Buttons */}
            <div className="rounded-3xl p-6" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
              <div className="flex flex-wrap gap-3 justify-center">
                {["weekly", "monthly", "allTime"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => handleTimeFrameChange(tf)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                      timeFrame === tf
                        ? "text-white shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={timeFrame === tf 
                      ? { background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }
                      : { background: 'rgba(0,0,0,0.03)', color: 'var(--text)' }
                    }
                  >
                    {tf === "weekly"
                      ? "This Week"
                      : tf === "monthly"
                      ? "This Month"
                      : "All Time"}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="rounded-3xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto" style={{ borderColor: 'var(--primary)' }}></div>
                <p className="mt-4" style={{ color: 'var(--muted)' }}>Loading champions...</p>
              </div>
            ) : (
              <>
                {/* Top 3 students */}
                <div className="rounded-3xl p-8" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
                  <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--text)' }}>🏆 Top Champions 🏆</h2>
                  <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-8">
                    {students.slice(0, 3).map((s, idx) => (
                      <div key={s.id} className="flex flex-col items-center">
                        <div className="relative">
                          <div
                            className={`rounded-full flex items-center justify-center ${
                              idx === 0 ? "w-24 h-24 text-5xl" : "w-20 h-20 text-4xl"
                            }`}
                            style={{ background: 'rgba(22,163,74,0.1)' }}
                          >
                            {s.avatar}
                          </div>
                          <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white ${
                            idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'
                          }`}>
                            {idx + 1}
                          </div>
                        </div>
                        <div className="mt-3 text-center">
                          <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{s.name}</h3>
                          <p className="font-bold" style={{ color: 'var(--primary)' }}>{s.ecoPoints} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--panel)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(22,163,74,0.06)' }}>
                  <div className="p-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Complete Rankings</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead style={{ background: 'rgba(22,163,74,0.05)' }}>
                        <tr>
                          {["Rank", "Student", "Grade", "Eco Points", "Badges"].map((h) => (
                            <th
                              key={h}
                              className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--muted)' }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ divideColor: 'rgba(0,0,0,0.06)' }}>
                        {students.map((s) => (
                          <tr
                            key={s.id}
                            className={`transition-colors hover:bg-opacity-50 ${
                              currentUser?.id === s.id ? "font-medium" : ""
                            }`}
                            style={currentUser?.id === s.id 
                              ? { background: 'rgba(22,163,74,0.1)' }
                              : {}
                            }
                          >
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                s.rank <= 3 ? 'text-white' : ''
                              }`}
                              style={s.rank <= 3 
                                ? { background: s.rank === 1 ? '#fbbf24' : s.rank === 2 ? '#9ca3af' : '#fb923c' }
                                : { color: 'var(--text)' }
                              }>
                                {s.rank}
                              </span>
                            </td>
                            <td className="px-6 py-4 flex items-center">
                              <div className="h-10 w-10 flex items-center justify-center rounded-full text-xl" style={{ background: 'rgba(22,163,74,0.1)' }}>
                                {s.avatar}
                              </div>
                              <span className="ml-3 font-medium" style={{ color: 'var(--text)' }}>
                                {s.name}
                                {currentUser?.id === s.id && (
                                  <span className="ml-2 text-xs text-white px-2 py-0.5 rounded-full" style={{ background: 'var(--primary)' }}>
                                    You
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="px-6 py-4" style={{ color: 'var(--muted)' }}>{s.grade}</td>
                            <td className="px-6 py-4 font-bold" style={{ color: 'var(--primary)' }}>{s.ecoPoints}</td>
                            <td className="px-6 py-4 text-xl">
                              {"⭐".repeat(s.badges)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
