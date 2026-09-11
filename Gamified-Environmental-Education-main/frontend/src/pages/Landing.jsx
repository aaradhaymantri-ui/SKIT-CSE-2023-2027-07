import React from "react";
import { Link } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

function Landing() {
  return (
    <div className="landing">
      <AnimatedBackground />
      <div className="landing-inner">
        <div className="landing-badge">Eco • Learn • Play</div>
        <h1 className="landing-title">
          Learn Sustainability
          <span className="landing-gradient"> The Modern Way</span>
        </h1>
        <p className="landing-subtitle">
          Interactive games, real-time environmental data, and a smart eco chatbot.
          Make green learning beautiful, fun, and unforgettable.
        </p>
        <div className="landing-cta">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
          <Link to="/studentdashboard" className="btn btn-ghost">View Dashboard</Link>
        </div>
        <div className="landing-foot">
          <span>Trusted by students and teachers</span>
          <span className="dots">• • •</span>
          <span>Built for the planet</span>
        </div>
      </div>

      {/* ✅ Features Section */}
      <section className="features">
        {/* 🔗 Wrapped with Link to redirect to /livedashboard */}
        <Link to="/livedashboard" className="feature clickable-feature">
          <div className="feature-icon">🌬️</div>
          <h3>Live Air & Weather</h3>
          <p>Real-time AQI and climate metrics visualized beautifully.</p>
        </Link>

        <div className="feature">
          <div className="feature-icon">🎮</div>
          <h3>Learn by Playing</h3>
          <p>Eco games that teach recycling, conservation, and more.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">🤖</div>
          <h3>Smart EcoBot</h3>
          <p>Ask questions and get actionable sustainability tips.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
