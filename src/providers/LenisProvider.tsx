"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

import { gsap } from "@/animations/gsap/gsap.config";
import { lenisConfig } from "@/animations/lenis/lenis.config";

function GsapTicker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis root options={lenisConfig}>
      <GsapTicker />
      {children}
    </ReactLenis>
  );
}
