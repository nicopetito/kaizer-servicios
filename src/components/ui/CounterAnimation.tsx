"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: string;
  className?: string;
}

function parseValue(raw: string): { prefix: string; number: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

export default function CounterAnimation({ value, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);
  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView || number === 0) return;

    const duration = 1400;
    const steps = 50;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * number));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <span ref={ref} className={className}>
      {prefix}{number > 0 ? displayed : ""}{suffix}
    </span>
  );
}
