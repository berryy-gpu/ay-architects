import { Fraunces, Inter } from "next/font/google";

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;
