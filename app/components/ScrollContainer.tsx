"use client";

import { useEffect, useRef, useCallback } from "react";
import "./ScrollContainer.css";

interface ScrollContainerProps {
  children: React.ReactNode;
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSectionRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((index: number) => {
    if (!containerRef.current || isScrollingRef.current) return;

    const sections = containerRef.current.children;

    if (index < 0 || index >= sections.length) return;

    currentSectionRef.current = index;
    isScrollingRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    sections[index].scrollIntoView({ behavior: "smooth", block: "start" });

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    let lastScrollTime = 0;
    const SCROLL_COOLDOWN = 1000;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN || isScrollingRef.current)
        return;

      const sections = containerRef.current?.children.length || 0;

      if (e.deltaY > 50 && currentSectionRef.current < sections - 1) {
        lastScrollTime = now;
        scrollToSection(currentSectionRef.current + 1);
      } else if (e.deltaY < -50 && currentSectionRef.current > 0) {
        lastScrollTime = now;
        scrollToSection(currentSectionRef.current - 1);
      }
    };

    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent pull-to-refresh when at the top
      if (currentSectionRef.current === 0) {
        const touchY = e.touches[0].clientY;
        if (touchY > touchStartY) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN || isScrollingRef.current)
        return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const timeDiff = now - touchStartTime;
      const sections = containerRef.current?.children.length || 0;

      if (Math.abs(diff) > 50 && timeDiff < 500) {
        if (diff > 0 && currentSectionRef.current < sections - 1) {
          lastScrollTime = now;
          scrollToSection(currentSectionRef.current + 1);
        } else if (diff < 0 && currentSectionRef.current > 0) {
          lastScrollTime = now;
          scrollToSection(currentSectionRef.current - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN || isScrollingRef.current)
        return;

      const sections = containerRef.current?.children.length || 0;

      if (
        (e.key === "ArrowDown" || e.key === "PageDown") &&
        currentSectionRef.current < sections - 1
      ) {
        e.preventDefault();
        lastScrollTime = now;
        scrollToSection(currentSectionRef.current + 1);
      } else if (
        (e.key === "ArrowUp" || e.key === "PageUp") &&
        currentSectionRef.current > 0
      ) {
        e.preventDefault();
        lastScrollTime = now;
        scrollToSection(currentSectionRef.current - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [scrollToSection]);

  return (
    <main ref={containerRef} className="scroll-container">
      {children}
    </main>
  );
}
