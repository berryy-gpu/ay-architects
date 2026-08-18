import { siteConfig } from "@/config/site";
import { contactInfo } from "@/config/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-8 py-12 sm:px-12 md:px-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <span className="font-display text-lg tracking-[0.15em] text-paper">
          {siteConfig.name}
        </span>

        <a
          href={contactInfo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative font-sans text-xs uppercase tracking-[0.25em] text-paper/80 transition-colors duration-300 hover:text-paper"
        >
          Instagram
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </a>
      </div>

      <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.2em] text-paper/50">
        © {year} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
