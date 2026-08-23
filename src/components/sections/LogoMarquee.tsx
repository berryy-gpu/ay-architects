"use client";

import Image from "next/image";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface PressLogo {
  name: string;
  src: string;
}

// Baked-in backgrounds: Ingram/Dara/Mazhar Munir ship on white, YC Studio
// and Heera & Sons ship on black. Rather than trying to strip those
// programmatically (unreliable, produces edge artifacts), every logo sits
// in the same neutral bg-surface tile — the white-background logos blend
// in seamlessly, the black-background ones read as an intentional dark
// plaque, and either way the row reads as one consistent system rather
// than a mismatched grid.
const PRESS_LOGOS: PressLogo[] = [
  { name: "Ingram Architecture", src: "/images/press/ingram-architecture.jpg" },
  { name: "Dara Architects", src: "/images/press/dara-architects.jpg" },
  { name: "Mazhar Munir", src: "/images/press/mazhar-munir.jpg" },
  { name: "YC Studio", src: "/images/press/yc-studio.jpg" },
  { name: "Heera & Sons", src: "/images/press/heera-and-sons.jpg" },
];

const EDGE_FADE_MASK =
  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";

function LogoTile({ logo }: { logo: PressLogo }) {
  return (
    <div className="flex h-16 w-40 shrink-0 items-center justify-center rounded-md border border-accent-secondary/20 bg-surface px-6 sm:h-20 sm:w-48">
      <div className="relative h-10 w-full sm:h-12">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function LogoMarquee() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section className="bg-background px-8 py-20 sm:px-12 md:px-16 md:py-24">
      <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-foreground/60">
        In good company
      </p>

      {prefersReducedMotion ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12">
          {PRESS_LOGOS.map((logo) => (
            <LogoTile key={logo.name} logo={logo} />
          ))}
        </div>
      ) : (
        <div
          className="relative mt-10 overflow-hidden md:mt-12"
          style={{ maskImage: EDGE_FADE_MASK, WebkitMaskImage: EDGE_FADE_MASK }}
        >
          <div
            className="marquee-track flex w-max gap-4"
            style={{ animation: "marquee-scroll 36s linear infinite" }}
          >
            {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, i) => (
              <LogoTile key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
