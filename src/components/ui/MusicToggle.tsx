"use client";

import { useEffect, useRef, useState } from "react";

import {
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const STORAGE_KEY = "ay-music-enabled";
const HINT_SEEN_KEY = "ay-music-hint-seen";
const FADE_MS = 800;
const DEFAULT_VOLUME = 0.4;
const HINT_AUTO_DISMISS_MS = 4500;

/** Clamp — floating-point drift in the step-based ramp below can otherwise
 * push the interpolated value a hair outside [0, 1] (e.g. -0.00005), which
 * HTMLMediaElement.volume throws on rather than silently clamping itself. */
function clampVolume(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/**
 * Fades `audio.volume` toward `target` over `duration`ms via rAF (no Web
 * Audio GainNode — this project doesn't otherwise use the Web Audio API,
 * and a manual ramp on the element's own `volume` is the lighter option
 * the brief explicitly allows). `rampToken` lets a new ramp invalidate an
 * in-flight one instead of fighting it if the button is clicked rapidly.
 */
function rampVolume(
  audio: HTMLAudioElement,
  target: number,
  duration: number,
  rampTokenRef: { current: number },
  onComplete?: () => void
) {
  const myToken = ++rampTokenRef.current;
  const from = audio.volume;
  const start = performance.now();
  const clampedTarget = clampVolume(target);

  function step(now: number) {
    if (rampTokenRef.current !== myToken) return; // superseded by a newer ramp
    const t = Math.min(1, (now - start) / duration);

    if (t >= 1) {
      // Final frame: set the exact target rather than the interpolated
      // value — `from + (target - from) * 1` isn't guaranteed to equal
      // `target` bit-for-bit — and stop ticking. No further rAF requested.
      audio.volume = clampedTarget;
      onComplete?.();
      return;
    }

    audio.volume = clampVolume(from + (clampedTarget - from) * t);
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Shared background-music toggle — mounted once each on the homepage Hero
 * and the /services hero, not reimplemented per page. Off by default on
 * every fresh render (server has no localStorage); the real stored
 * preference is synced in an effect after mount, never read during render,
 * so there's nothing for hydration to mismatch on.
 */
export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rampTokenRef = useRef(0);
  const wasPlayingBeforeHiddenRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  // Sync stored preference after mount. A returning visitor who'd already
  // opted in gets an attempted resume — browsers vary on whether that's
  // allowed without a fresh gesture; a rejected promise is handled quietly
  // either way, never a forced/attribute-based autoplay.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (localStorage.getItem(STORAGE_KEY) !== "on") return;

    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        rampVolume(audio, DEFAULT_VOLUME, FADE_MS, rampTokenRef);
      })
      .catch(() => {
        // Blocked by autoplay policy — stay off, no console noise.
      });
  }, []);

  // Page Visibility: pause while backgrounded, resume on return only if it
  // was actually playing before (not a forced resume otherwise).
  useEffect(() => {
    function handleVisibilityChange() {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        wasPlayingBeforeHiddenRef.current = isPlaying;
        if (isPlaying) audio.pause();
      } else if (wasPlayingBeforeHiddenRef.current) {
        audio.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  // One-time first-visit callout — purely visual, never touches audio.
  // Shown once the hero's own entrance has had time to settle, gated by
  // localStorage so it truly never appears again on this browser once
  // dismissed (by timeout, by interacting with the toggle, or by any
  // click/scroll on the page).
  useEffect(() => {
    if (localStorage.getItem(HINT_SEEN_KEY) === "true") return;

    const heroSettleDelayMs =
      (prefersReducedMotion
        ? LOADING_SCREEN_DURATION_REDUCED_MOTION
        : LOADING_SCREEN_DURATION) * 1000 +
      (prefersReducedMotion ? 300 : 1300);

    const showTimer = setTimeout(() => setShowHint(true), heroSettleDelayMs);
    return () => clearTimeout(showTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!showHint) return;

    function dismiss() {
      setShowHint(false);
      localStorage.setItem(HINT_SEEN_KEY, "true");
    }

    const autoDismissTimer = setTimeout(dismiss, HINT_AUTO_DISMISS_MS);
    // Any click or scroll anywhere counts as "seen it, moving on" — not
    // just interacting with the toggle itself.
    window.addEventListener("click", dismiss, { once: true });
    window.addEventListener("scroll", dismiss, { once: true, passive: true });

    return () => {
      clearTimeout(autoDismissTimer);
      window.removeEventListener("click", dismiss);
      window.removeEventListener("scroll", dismiss);
    };
  }, [showHint]);

  function dismissHint() {
    if (!showHint) return;
    setShowHint(false);
    localStorage.setItem(HINT_SEEN_KEY, "true");
  }

  function handleToggle() {
    dismissHint();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, "off");
      rampVolume(audio, 0, FADE_MS, rampTokenRef, () => audio.pause());
      return;
    }

    // Explicit click — the one case that's always allowed to attempt play().
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        localStorage.setItem(STORAGE_KEY, "on");
        rampVolume(audio, DEFAULT_VOLUME, FADE_MS, rampTokenRef);
      })
      .catch(() => {
        // Playback failed for some other reason — leave state off, no throw.
      });
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 sm:bottom-8 sm:right-8">
      {showHint && (
        <div
          role="status"
          className={`absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full border border-accent/40 bg-background-dark px-4 py-2 font-sans text-xs text-foreground-on-dark shadow-sm transition-opacity duration-500 ${
            showHint ? "opacity-100" : "opacity-0"
          }`}
        >
          ♪ This site has sound
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isPlaying}
        aria-label={
          isPlaying ? "Mute background music" : "Play background music"
        }
        className={`flex items-center gap-2 rounded-full border pl-3 pr-4 py-2 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          isPlaying
            ? "border-accent/50 bg-background-dark/70"
            : "border-foreground-on-dark/25 bg-background-dark/50 hover:border-foreground-on-dark/50"
        } ${
          showHint && !prefersReducedMotion
            ? "[animation:attention-pulse_0.9s_ease-in-out_3]"
            : ""
        }`}
      >
        {isPlaying ? (
          <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className="w-[3px] rounded-full bg-accent"
                style={
                  prefersReducedMotion
                    ? { height: "100%" }
                    : {
                        height: "100%",
                        animation: "eq-pulse 0.9s ease-in-out infinite",
                        animationDelay: `${bar * 0.15}s`,
                      }
                }
              />
            ))}
          </span>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-foreground-on-dark/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path d="M17 8.5 21.5 15.5" />
            <path d="M21.5 8.5 17 15.5" />
          </svg>
        )}
        <span
          className={`font-sans text-[11px] uppercase tracking-[0.2em] ${
            isPlaying ? "text-accent" : "text-foreground-on-dark/70"
          }`}
        >
          Music
        </span>
      </button>

      <audio ref={audioRef} src={src} loop preload="none" aria-hidden="true" />
    </div>
  );
}
