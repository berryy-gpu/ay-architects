import { Card } from "@/components/ui/Card";
import { ChatIcon, ClockIcon, MailIcon, PinIcon } from "@/components/ui/icons";
import type { ContactMethod } from "@/config/contact";

const ICONS = {
  mail: MailIcon,
  chat: ChatIcon,
  pin: PinIcon,
  clock: ClockIcon,
};

interface ContactMethodCardProps {
  method: ContactMethod;
  /** Whether this card participates in a parent GSAP stagger reveal (homepage) — plain and static on /contact. */
  animated?: boolean;
}

export function ContactMethodCard({ method, animated }: ContactMethodCardProps) {
  const Icon = ICONS[method.icon];

  return (
    <Card href={method.href} external={method.external} animated={animated}>
      <Icon className="h-5 w-5 text-accent" />
      <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.3em] text-foreground/70">
        {method.label}
      </p>
      <p className="mt-1.5 break-words font-sans text-base text-foreground sm:text-lg">
        {method.value}
      </p>
    </Card>
  );
}
