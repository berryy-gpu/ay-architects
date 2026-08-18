const WHATSAPP_MESSAGE = "Hi, I'd like to discuss a project";

function whatsappLink(number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export const contactInfo = {
  email: "ayarchitectsdesign@gmail.com",
  whatsapp: [
    {
      label: "WhatsApp",
      display: "+92 316 4228213",
      href: whatsappLink("923164228213"),
    },
    {
      label: "WhatsApp (Alt)",
      display: "+92 316 4252381",
      href: whatsappLink("923164252381"),
    },
  ],
  location: "Lahore, Pakistan",
  hours: "Mon–Fri, 9:00 AM – 5:00 PM (PKT)",
  instagram: "https://www.instagram.com/_ayarchitects/",
} as const;

export type ContactMethodIcon = "mail" | "chat" | "pin" | "clock";

export interface ContactMethod {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ContactMethodIcon;
}

/** Single source for the contact-method list rendered as cards on both the
 * homepage teaser and the /contact page — see ContactMethodCard. */
export const CONTACT_METHODS: ContactMethod[] = [
  {
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: "mail",
  },
  ...contactInfo.whatsapp.map((entry) => ({
    label: entry.label,
    value: entry.display,
    href: entry.href,
    external: true,
    icon: "chat" as const,
  })),
  { label: "Location", value: contactInfo.location, icon: "pin" },
  { label: "Hours", value: contactInfo.hours, icon: "clock" },
];
