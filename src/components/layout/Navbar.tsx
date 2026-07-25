"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger } from "@/animations/gsap/gsap.config";
import {
  LOADING_SCREEN_DURATION,
  LOADING_SCREEN_DURATION_REDUCED_MOTION,
} from "@/constants/motion";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NAV_ITEMS = [
  { label: "Projects", href: "#projects" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const lenis = useLenis();

  // Entrance, synced to the Loading Experience's known duration.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: prefersReducedMotion
          ? LOADING_SCREEN_DURATION_REDUCED_MOTION
          : LOADING_SCREEN_DURATION,
      });

      if (prefersReducedMotion) {
        tl.to(header, { opacity: 1, duration: 0.4 });
      } else {
        tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      }
    }, header);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Transparent-over-Hero -> solid once the Hero itself leaves the viewport.
  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "bottom top",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => trigger.kill();
  }, []);

  // Build the mobile menu's open timeline once; toggles just play/reverse it.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      if (prefersReducedMotion) {
        tl.to(menu, { opacity: 1, duration: 0.3 }).set("[data-menu-item]", {
          opacity: 1,
          y: 0,
          letterSpacing: "0.15em",
        });
      } else {
        tl.to(menu, { opacity: 1, duration: 0.4, ease: "power2.out" }).to(
          "[data-menu-item]",
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.15em",
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.2"
        );
      }

      menuTimelineRef.current = tl;
    }, menu);

    return () => {
      ctx.revert();
      menuTimelineRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isMenuOpen) {
      menuTimelineRef.current?.play();
    } else {
      menuTimelineRef.current?.reverse();
    }
  }, [isMenuOpen]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMenuOpen, lenis]);

  // Focus trap + Escape-to-close for the mobile menu.
  useEffect(() => {
    if (!isMenuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  }

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setIsMenuOpen(false);
    lenis?.scrollTo(href);
  }

  function handleBrandClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setIsMenuOpen(false);
    lenis?.scrollTo(0);
  }

  const showDarkText = isScrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 opacity-0 ${
          prefersReducedMotion ? "" : "-translate-y-2"
        } transition-colors duration-500 ${
          showDarkText ? "bg-paper/95" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 sm:px-12 md:px-16">
          <a
            href="#"
            onClick={handleBrandClick}
            className={`font-display text-lg tracking-[0.15em] transition-colors duration-300 hover:opacity-80 ${
              showDarkText ? "text-ink" : "text-paper"
            }`}
          >
            AY Architects
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-10 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`group relative font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-500 ${
                  showDarkText
                    ? "text-ink/80 hover:text-ink"
                    : "text-paper/80 hover:text-paper"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                    showDarkText ? "bg-ink" : "bg-paper"
                  }`}
                />
              </a>
            ))}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className={`font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-300 md:hidden ${
              showDarkText ? "text-ink" : "text-paper"
            }`}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink opacity-0 md:hidden ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => handleNavClick(event, item.href)}
            data-menu-item
            className="translate-y-3 font-display text-4xl uppercase tracking-[0.5em] text-paper opacity-0 transition-colors duration-300 hover:text-paper/70"
          >
            {item.label}
          </a>
        ))}

        <button
          type="button"
          onClick={closeMenu}
          data-menu-item
          className="mt-4 translate-y-3 font-display text-4xl uppercase tracking-[0.5em] text-paper opacity-0 transition-colors duration-300 hover:text-paper/70"
        >
          Close
        </button>
      </div>
    </>
  );
}
