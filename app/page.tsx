"use client";

import { useEffect, useMemo, useState } from "react";

const TARGET = new Date("2027-05-25T00:00:00+03:00").getTime();

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
      <div className="noise" />
      <div className="grid" />
      <div className="glow glow-left" />
      <div className="glow glow-right" />

      <header className="topbar">
        <span className="brand-mark"><b>GW</b><i /></span>
        <span className="date-code">MAY 25 / 2027</span>
        <span className="status"><i /> COUNTDOWN LIVE</span>
      </header>

      <section className="hero" aria-labelledby="title">
        <div className="orbit-badge" aria-hidden="true">
          <span className="orbit-text">DENTIST • BIRTHDAY • DENTIST • BIRTHDAY •</span>
          <div className="doctor-icon"><b>G</b><span>+</span></div>
        </div>

        <p className="eyebrow"><span>01</span> A BIRTHDAY WORTH WAITING FOR</p>
        <h1 id="title">SHE MAKES<br /><em>SMILES.</em></h1>
        <div className="name-row"><span>DR.</span><strong>GANA WAEL</strong></div>
        <p className="lead">Now we count every second until the world celebrates her.</p>

        <div className={`countdown ${ready ? "ready" : ""}`} aria-label="Time remaining until Dr. Gana Wael's birthday">
          {units.map((unit, index) => (
            <div className="tooth-unit" key={unit.label}>
              <div className="drop-stage">
                <div className="tooth-drop" key={unit.value} style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}>
                  <div className="molar">
                    <span className="tooth-shine" />
                    <span className="value">{String(unit.value).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
              <span className="unit-label">{unit.label}</span>
              <span className="unit-index">0{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="bottom-copy">
          <span>THE BIG DAY</span><i /><strong>25 — 05</strong><i /><span>KEEP SMILING</span>
        </div>
      </section>

      <footer>
        <span>BUILT FOR THE DOCTOR WITH THE BRIGHTEST SMILE</span>
        <span className="signature">GANA / 25.05</span>
      </footer>
    </main>
  );
}
