
import React, { useEffect } from "react";
import "../styles/Dashboard.css"
import { Link } from "react-router-dom";

function Header(){
    useEffect(() => {
      const toggle = document.getElementById("toggle");
      if (!toggle) return;
      const onChange = () => {
        if (toggle.checked) {
          document.body.setAttribute("data-theme", "dark");
        } else {
          document.body.removeAttribute("data-theme");
        }
      };
      toggle.addEventListener("change", onChange);
      return () => {
        toggle.removeEventListener("change", onChange);
      };
    }, []);
    return (
        <header className="header">
      <div className="logo">
        <span className="logo-icon">🌱</span>
        <span className="logo-text">EcoLearn</span>
      </div>
      <svg className="header-waves" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,96C672,85,768,107,864,112C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="rgba(35,164,85,0.10)"/>
        <path d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,138.7C672,128,768,128,864,138.7C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="rgba(35,164,85,0.07)"/>
      </svg>
      <div className="actions">
        <div className="theme-toggle">
          <input type="checkbox" id="toggle" />
          <label htmlFor="toggle"></label>
        </div>
        <Link to="/signin"><button className="login">Login</button></Link>
        <Link to="/signup"><button className="signup">Sign Up</button></Link>
      </div>
    </header>
    );
}

export default Header;
