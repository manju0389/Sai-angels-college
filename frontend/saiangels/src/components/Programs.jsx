import { useEffect, useRef, useState } from "react";


const stats = [
  {
    value: 45000,
    label: "Alumni",
    color: "#f7bd00",
  },
  {
    value: 70000,
    label: "Students",
    color: "#0d2c6c",
  },
  {
    value: 100,
    label: "Faculty",
    color: "#ff9c09",
  },
];

export default function Programs({ programs }) {
  const counterRef = useRef(null);
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      
      {/* YOUR EXISTING CAMPUS INFRASTRUCTURE */}
      <section className="programs">
        <h2 className="text-center fw-bold pb-4">
          Campus Infrastructure
        </h2>

        <div className="programs-container container">
          {programs.map((item, index) => (
            <a
              href="curriculum"
              style={{ textDecoration: "none" }}
              key={index}
            >
              <div className="card">
                <img src={item.image} alt={item.title} />

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* COUNTER SECTION */}
      <section className="stats-section" ref={counterRef}>
        <div className="container text-center">

          <h2 className="fw-bold">
            Why Sai Angels PU College
          </h2>

          <p className="stats-subtitle">
          </p>

          <div className="counter-grid">
            {stats.map((stat, index) => (
              <CounterCard
                key={index}
                stat={stat}
                startCounter={startCounter}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}


/* COUNTER CARD */
function CounterCard({ stat, startCounter }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounter) return;

    let current = 0;
    const duration = 1800;
    const intervalTime = 16;
    const increment =
      stat.value / (duration / intervalTime);

    const timer = setInterval(() => {
      current += increment;

      if (current >= stat.value) {
        current = stat.value;
        clearInterval(timer);
      }

      setCount(Math.floor(current));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [startCounter, stat.value]);

  return (
    <div
      className="counter-card"
      style={{ "--card-color": stat.color }}
    >
      <div className="counter-icon">
        {stat.icon}
      </div>

      <div className="counter-number">
        {count.toLocaleString()}+
      </div>

      <div className="counter-label">
        {stat.label}
      </div>

      <span className="counter-dot"></span>
    </div>
  );
}
