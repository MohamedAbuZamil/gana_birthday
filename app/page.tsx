"use client";

import { useEffect, useMemo, useState } from "react";

const TARGET = new Date("2027-05-25T00:00:00+03:00").getTime();
const FLOATERS = ["💗", "🦷", "🩺", "👩‍⚕️", "💕", "🦷", "🩺", "💖", "👩‍⚕️", "🦷", "💗", "🩺", "💕", "🦷"];

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const distance = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function Home() {
  const [time, setTime] = useState<Remaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => { setTime(getRemaining()); setReady(true); };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(() => [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINUTES", value: time.minutes },
    { label: "SECONDS", value: time.seconds },
  ], [time]);

  return (
    <main>
      <div className="soft-glow glow-a" />
      <div className="soft-glow glow-b" />
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map((emoji, index) => (
          <span key={index} className={`floater floater-${index + 1}`}>{emoji}</span>
        ))}
      </div>

      <header>
        <div className="mini-logo"><span>G</span><b>GANA&apos;S DAY</b></div>
        <div className="date-chip">25 MAY 2027</div>
      </header>

      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">THE SWEETEST COUNTDOWN</p>

        <div className="gana-system" aria-hidden="true">
          <div className="orbit orbit-one"><span>💗</span></div>
          <div className="orbit orbit-two"><span>🦷</span></div>
          <div className="orbit orbit-three"><span>✨</span></div>
          <div className="gana-sun"><small>DR.</small><strong>GANA</strong><i>WAEL</i></div>
        </div>

        <h1 id="title">Her special day is<br /><em>getting closer.</em></h1>
        <p className="subtitle">For the dentist who makes every smile a little brighter.</p>

        <div className={`countdown ${ready ? "ready" : ""}`} aria-label="Time remaining until Dr. Gana Wael's birthday">
          {units.map((unit) => (
            <div className="counter-card" key={unit.label}>
              <span className="counter-value" key={unit.value}>{String(unit.value).padStart(2, "0")}</span>
              <span className="counter-label">{unit.label}</span>
            </div>
          ))}
        </div>

        <p className="note"><span>♡</span> Save the date — something beautiful is on its way.</p>
      </section>

      <footer><span>MADE WITH LOVE FOR DR. GANA</span><i /><span>25 · 05 · 2027</span></footer>
    </main>
  );
}
