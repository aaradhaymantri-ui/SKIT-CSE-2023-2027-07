import React, { useEffect, useRef } from "react";
import "../styles/Dashboard.css";

function MetricCard({ color,icon,value,unit,title,desc }){
    const cardRef = useRef(null);
    const valueRef = useRef(null);
    const lastValueRef = useRef(null);

    useEffect(() => {
      const el = cardRef.current;
      if (!el) return;
      function onMove(e){
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 6;
        const ry = (x - 0.5) * 6;
        el.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      function onLeave(){
        el.style.transform = "";
      }
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, []);

    useEffect(() => {
      // count-up animation for numeric values
      const displayEl = valueRef.current;
      const isNumber = typeof value === "number" || (typeof value === "string" && /^-?\d+(\.\d+)?/.test(value));
      if (!displayEl || !isNumber) return;
      const parseNum = (v) => typeof v === "number" ? v : parseFloat(String(v));
      const target = parseNum(value);
      const prev = lastValueRef.current ?? 0;
      const start = performance.now();
      const duration = 900;
      function tick(now){
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = prev + (target - prev) * eased;
        displayEl.textContent = Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      lastValueRef.current = target;
    }, [value]);

    return (
      <div ref={cardRef} className="metric-card">
        <div className="metric-icon" style={{ color }}>
          {icon}
        </div>
        <div ref={valueRef} className="metric-value" style={{ color }}>
          {value}
        </div>
        <div className="metric-unit">{unit}</div>
        <h3 className="metric-title">{title}</h3>
        <p className="metric-desc">{desc}</p>
      </div>
    );
}

export default MetricCard;
