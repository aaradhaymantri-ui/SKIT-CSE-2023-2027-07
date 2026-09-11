import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import MetricCard from "../components/MetricCard.jsx";
import FactBox from "../components/FactBox.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";

function App() {
  const [data, setData] = useState({
    temperature: null,
    humidity: null,
    aqi: null,
    uvIndex: 6,
    co2: 387,
    pH: 8.2
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log("Error fetching data: ", err));
  }, []);

  return (
    <div className="app full-screen">
      <AnimatedBackground />

      <header className="dashboard-header">
        <button 
          className="back-button" 
          onClick={() => navigate("/")}
          aria-label="Back to student dashboard"
        >
          ← Back
        </button>
      </header>

      <main className="dashboard elevated-section">
        <h1 className="title">Environmental Dashboard</h1>
        <p className="subtitle">
          Monitor real-time environmental data and learn how to make a positive impact.
        </p>

        <div className="metrics-grid">
          <MetricCard
            color="#4CAF50"
            icon="🌬️"
            value={data.aqi ?? "--"}
            unit="AQI"
            title="Air Quality Index"
            desc="Good air quality. Great for outdoor activities!"
          />
          <MetricCard
            color="#ef4444"
            icon="🌡️"
            value={data.temperature !== null ? `${data.temperature}°` : "--"}
            unit="Celsius"
            title="Temperature"
            desc="Pleasant temperature with mild conditions."
          />
          <MetricCard
            color="#29B6F6"
            icon="💧"
            value={data.humidity ?? "--"}
            unit="%"
            title="Humidity Level"
            desc="Comfortable humidity levels for the season."
          />
          <MetricCard
            color="#f59e0b"
            icon="☀️"
            value={data.uvIndex ?? "--"}
            unit="Moderate"
            title="UV Index"
            desc="Moderate UV levels. Sun protection recommended."
          />
          <MetricCard
            color="#16a34a"
            icon="🌲"
            value={data.co2 ?? "--"}
            unit="ppm CO₂"
            title="Carbon Emissions"
            desc="Current atmospheric CO₂ concentration levels."
          />
          <MetricCard
            color="#0288D1"
            icon="🌊"
            value={data.pH ?? "--"}
            unit="pH Level"
            title="Water Quality Index"
            desc="Excellent water quality with optimal pH balance."
          />
        </div>

        <FactBox />
      </main>
    </div>
  );
}

export default App;
