"use client";

import { useEffect, useMemo, useState } from "react";

const TARGET = new Date("2027-05-25T00:00:00+03:00").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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
    const tick = () => {
      setTime(getRemaining());
      setReady(true);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(
    () => [
      { label: "يوم", value: time.days },
      { label: "ساعة", value: time.hours },
      { label: "دقيقة", value: time.minutes },
      { label: "ثانية", value: time.seconds },
    ],
    [time],
  );

  return (
    <main>
      <div className="wash wash-one" />
      <div className="wash wash-two" />
      <div className="stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} style={{ "--i": index } as React.CSSProperties}>✦</i>
        ))}
      </div>

      <span className="floating-tooth tooth-one" aria-hidden="true">🦷</span>
      <span className="floating-tooth tooth-two" aria-hidden="true">🦷</span>
      <span className="floating-tooth tooth-three" aria-hidden="true">🦷</span>

      <section className="hero" aria-labelledby="birthday-title">
        <div className="date-pill" aria-label="موعد عيد الميلاد">
          <span>25</span><b>مايو</b><span>2027</span>
        </div>

        <div className="doctor" aria-hidden="true">
          <div className="doctor-hair" />
          <div className="doctor-face">
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="doctor-smile" />
          </div>
          <div className="doctor-coat"><span>🦷</span></div>
          <div className="dental-mirror">✦</div>
        </div>

        <p className="kicker">العدّ التنازلي لأجمل ابتسامة</p>
        <h1 id="birthday-title">
          عيد ميلاد سعيد
          <em>Dr. Gana Wael</em>
        </h1>
        <p className="subtitle">قرّب اليوم اللي ابتسامته أحلى من كل الابتسامات ✨</p>

        <div className={`countdown ${ready ? "is-ready" : ""}`} dir="ltr" aria-label="الوقت المتبقي حتى عيد الميلاد">
          {units.map((unit, index) => (
            <div className="unit-group" key={unit.label}>
              <div className="unit-card">
                <span className="number" key={unit.value}>{String(unit.value).padStart(2, "0")}</span>
                <span className="unit-label">{unit.label}</span>
              </div>
              {index < units.length - 1 && <span className="colon" aria-hidden="true">:</span>}
            </div>
          ))}
        </div>

        <div className="message">
          <span aria-hidden="true">♡</span>
          <p>كل ثانية بتقع… بتقرّبنا من يوم مميز جدًا</p>
        </div>
      </section>

      <footer><span>made with a big smile</span><i /><span>for Dr. Gana</span></footer>
    </main>
  );
}
