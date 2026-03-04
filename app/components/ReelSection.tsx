"use client";

import { useState, useEffect, useRef } from "react";
import "./ReelSection.css";

interface ReelItem {
  id: number;
  content: string;
  emoji: string;
}

const REEL_ITEMS: ReelItem[] = [
  { id: 1, content: "Memories", emoji: "📸" },
  { id: 2, content: "Adventures", emoji: "🌍" },
  { id: 3, content: "Moments", emoji: "✨" },
  { id: 4, content: "Dreams", emoji: "💭" },
];

export default function ReelSection() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [showMoments, setShowMoments] = useState(false);
  const adventuresRef = useRef<HTMLDivElement>(null);
  const momentsRef = useRef<HTMLDivElement>(null);

  const handleMemoriesClick = () => {
    setShowBirthday(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === adventuresRef.current) {
              setShowWishes(true);
            }
            if (entry.target === momentsRef.current) {
              setShowMoments(true);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    if (adventuresRef.current) {
      observer.observe(adventuresRef.current);
    }
    if (momentsRef.current) {
      observer.observe(momentsRef.current);
    }

    return () => {
      if (adventuresRef.current) {
        observer.unobserve(adventuresRef.current);
      }
      if (momentsRef.current) {
        observer.unobserve(momentsRef.current);
      }
    };
  }, []);

  return (
    <>
      {REEL_ITEMS.map((item) => (
        <section
          key={item.id}
          className="reel-section"
          ref={
            item.content === "Adventures"
              ? adventuresRef
              : item.content === "Moments"
                ? momentsRef
                : null
          }
        >
          <div className="reel-blur-bg" />

          <div className="reel-content">
            {item.content !== "Memories" &&
              item.content !== "Adventures" &&
              item.content !== "Moments" &&
              item.content !== "Dreams" && (
                <span className="reel-emoji">{item.emoji}</span>
              )}
            {item.content !== "Memories" &&
              item.content !== "Adventures" &&
              item.content !== "Moments" &&
              item.content !== "Dreams" && (
                <h3 className="reel-text">{item.content}</h3>
              )}

            {item.content === "Memories" && !showBirthday && (
              <button className="memories-button" onClick={handleMemoriesClick}>
                Click
              </button>
            )}

            {item.content === "Memories" && showBirthday && (
              <div className="birthday-content-inline">
                <div className="happy-words">
                  <span className="happy-word happy-1">Happy</span>
                  <span className="happy-word happy-2">Happy</span>
                  <span className="happy-word happy-3">Happy</span>
                  <span className="happy-word happy-4">Happy</span>
                  <span className="happy-word happy-5">Happy</span>
                  <span className="happy-word happy-6">Happy</span>
                  <span className="happy-word happy-7">Happy</span>
                  <span className="happy-word happy-8">Happy</span>
                  <span className="happy-word happy-9">Happy</span>
                  <span className="happy-word happy-10">Happy</span>
                </div>
                <h1 className="birthday-main">Birthday</h1>
                <h2 className="birthday-name">Miss Sakshi</h2>
                <span className="birthday-emoji-inline">🎂🎉🎈</span>
              </div>
            )}

            {item.content === "Adventures" && (
              <div
                className={`wishes-container ${showWishes ? "wishes-visible" : ""}`}
              >
                <p className="wish-line wish-line-1">
                  I hope this year brings you quiet happiness.
                </p>
                <p className="wish-line wish-line-2">
                  I hope you achieve the things you've been silently working
                  for.
                </p>
                <p className="wish-line wish-line-3">
                  I hope you grow greater and greater in your life.
                </p>
                <p className="wish-line wish-line-4">
                  I hope your efforts get noticed everywhere.
                </p>
                <p className="wish-line wish-line-5">
                  And I hope you feel valued — exactly the way you deserve.
                </p>
              </div>
            )}

            {item.content === "Moments" && (
              <div
                className={`moments-container ${showMoments ? "moments-visible" : ""}`}
              >
                <p className="moment-line moment-line-1">and again</p>
                <p className="moment-line moment-line-2">
                  Many many Happy Birthday Sakshi 🎂
                </p>
                <p className="moment-line moment-line-3">
                  Always be Happy 😄 and also Enjoy every moment in your life 😁
                </p>
              </div>
            )}

            {item.content === "Dreams" && (
              <div className="bye-container">
                <p className="bye-text">Bye byee.. 🐒😁</p>
              </div>
            )}
          </div>

          {/* Scroll Reminder */}
          <div className="reel-scroll-reminder">
            <span className="reel-scroll-text">Scroll</span>
            <div className="reel-scroll-arrow" />
          </div>
        </section>
      ))}
    </>
  );
}
