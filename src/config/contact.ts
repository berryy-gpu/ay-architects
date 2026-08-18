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
