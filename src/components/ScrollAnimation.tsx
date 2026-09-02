"use client";

import React, { useRef, useEffect, useState, CSSProperties } from "react";

export type AnimationType =
  | "fadeInUp"
  | "fadeIn"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn";

export interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  once?: boolean;
}

const hiddenTransforms: Record<AnimationType, string> = {
  fadeInUp: "translateY(30px)",
  fadeIn: "none",
  slideInLeft: "translateX(-40px)",
  slideInRight: "translateX(40px)",
  scaleIn: "scale(0.95)",
};

const visibleTransforms: Record<AnimationType, string> = {
  fadeInUp: "translateY(0)",
  fadeIn: "none",
  slideInLeft: "translateX(0)",
  slideInRight: "translateX(0)",
  scaleIn: "scale(1)",
};

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  animation = "fadeInUp",
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? visibleTransforms[animation]
      : hiddenTransforms[animation],
    transitionProperty: "opacity, transform",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
}

export default ScrollAnimation;
