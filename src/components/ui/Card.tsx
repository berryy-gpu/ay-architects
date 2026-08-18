interface CardProps {
  href?: string;
  external?: boolean;
  /** Adds the reveal-on-scroll starting state + a `data-reveal-item` hook for
   * a parent GSAP context to animate — see Contact.tsx / ServicesCapabilityList.tsx. */
  animated?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared card surface — reused across the homepage contact cards, /contact
 * info cards, and the Services capability grid so the site has one card
 * language instead of a new pattern per section. Border + `bg-surface`
 * tone-shift lifted from the portfolio SpecGrid card, extended with the
 * hover lift/glow this project's denser sections were missing.
 */
export function Card({ href, external, animated, className = "", children }: CardProps) {
  const classes = `group relative block rounded-sm border border-accent-secondary/25 bg-surface p-6 text-left transition-[transform,border-color,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-accent/50 [@media(hover:hover)]:hover:shadow-[0_10px_28px_-14px_rgba(19,43,35,0.35)] ${
    animated ? "translate-y-3 opacity-0" : ""
  } ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
        {...(animated ? { "data-reveal-item": true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={classes} {...(animated ? { "data-reveal-item": true } : {})}>
      {children}
    </div>
  );
}
