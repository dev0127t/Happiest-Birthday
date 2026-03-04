"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./HeroSection.css";

type TimeOfDay = "morning" | "day" | "evening" | "night";

interface TimeConfig {
    image: string;
    greeting: string;
    subtitle: string;
    overlayGradient: string;
    accentColor: string;
    glowColor: string;
    iconEmoji: string;
}

const TIME_CONFIG: Record<TimeOfDay, TimeConfig> = {
    morning: {
        image: "/photos/morning.jpeg",
        greeting: "Good Morning",
        subtitle: "Breathe in the gentle dawn",
        overlayGradient:
            "linear-gradient(180deg, rgba(60, 55, 65, 0.2) 0%, rgba(200, 155, 110, 0.15) 45%, rgba(55, 40, 50, 0.6) 100%)",
        accentColor: "#D4A574",
        glowColor: "rgba(212, 165, 116, 0.25)",
        iconEmoji: "🌅",
    },
    day: {
        image: "/photos/day.png",
        greeting: "Good Afternoon",
        subtitle: "Let the light guide your way",
        overlayGradient:
            "linear-gradient(180deg, rgba(50, 75, 120, 0.15) 0%, rgba(80, 120, 170, 0.08) 45%, rgba(30, 50, 90, 0.55) 100%)",
        accentColor: "#94BDE0",
        glowColor: "rgba(148, 189, 224, 0.25)",
        iconEmoji: "☀️",
    },
    evening: {
        image: "/photos/morning.jpeg",
        greeting: "Good Evening",
        subtitle: "Embrace the peaceful twilight",
        overlayGradient:
            "linear-gradient(180deg, rgba(50, 48, 60, 0.3) 0%, rgba(160, 110, 85, 0.2) 45%, rgba(35, 25, 40, 0.7) 100%)",
        accentColor: "#C8937A",
        glowColor: "rgba(200, 147, 122, 0.25)",
        iconEmoji: "🌇",
    },
    night: {
        image: "/photos/night.png",
        greeting: "Good Night",
        subtitle: "Rest beneath the quiet stars",
        overlayGradient:
            "linear-gradient(180deg, rgba(18, 22, 45, 0.2) 0%, rgba(30, 38, 70, 0.15) 45%, rgba(12, 16, 38, 0.65) 100%)",
        accentColor: "#B0C8E8",
        glowColor: "rgba(176, 200, 232, 0.2)",
        iconEmoji: "🌙",
    },
};

function getTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 7) return "morning";
    if (hour >= 7 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export default function HeroSection() {
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
    const [currentTime, setCurrentTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setTimeOfDay(getTimeOfDay());
        setCurrentTime(formatTime(new Date()));
        setMounted(true);

        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
            setCurrentTime(formatTime(new Date()));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const config = TIME_CONFIG[timeOfDay];

    if (!mounted) {
        return (
            <section className="hero-section" id="hero">
                <div className="hero-skeleton" />
            </section>
        );
    }

    return (
        <section className="hero-section" id="hero">
            {/* Background Image */}
            <div className="hero-image-container">
                <Image
                    src={config.image}
                    alt={`${timeOfDay} landscape`}
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    className={`hero-image ${imageLoaded ? "hero-image--loaded" : ""}`}
                    onLoad={() => setImageLoaded(true)}
                />
                {/* Overlay gradient */}
                <div
                    className="hero-overlay"
                    style={{ background: config.overlayGradient }}
                />
            </div>

            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-hey">- Heyyy -</h1>
                <p className="hero-day">It&apos;s the day 😄</p>
            </div>

            {/* Scroll Reminder */}
            <div className="hero-scroll-reminder">
                <span className="hero-scroll-text">Scroll</span>
                <div className="hero-scroll-arrow" />
            </div>
        </section>
    );
}
