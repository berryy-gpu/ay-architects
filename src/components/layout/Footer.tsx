import Link from "next/link";

import { siteConfig } from "@/config/site";
import { contactInfo } from "@/config/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-dark px-8 py-12 sm:px-12 md:px-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <span className="font-display text-lg tracking-[0.15em] text-foreground-on-dark">
          {siteConfig.name}
        </span>

        <div className="flex items-center gap-8">
          <Link
            href="/services"
            className="group relative font-sans text-xs uppercase tracking-[0.25em] text-foreground-on-dark/80 transition-colors duration-300 hover:text-foreground-on-dark"
          >
            Services
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </Link>

          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans text-xs uppercase tracking-[0.25em] text-foreground-on-dark/80 transition-colors duration-300 hover:text-foreground-on-dark"
          >
            Instagram
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </a>
        </div>
      </div>

      <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.2em] text-foreground-on-dark/60">
        © {year} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
