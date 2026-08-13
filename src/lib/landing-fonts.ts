import { Kanit } from "next/font/google";
import localFont from "next/font/local";

/**
 * Landing/case-study display fonts. Loaded only by immersive routes so
 * `/about`, `/contact`, and `/work` do not pay for unused weights.
 */
export const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const kerenHand = localFont({
  src: "../../public/fonts/Keren-Schoss-Hand.ttf",
  variable: "--font-keren-hand",
  display: "swap",
  weight: "400",
});
