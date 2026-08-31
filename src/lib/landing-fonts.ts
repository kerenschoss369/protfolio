import { Kanit } from "next/font/google";
import localFont from "next/font/local";

/**
 * Landing, work index, and case-study display fonts.
 */
export const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const kerenHand = localFont({
  src: "../../public/fonts/Keren-Schoss-Hand.ttf",
  variable: "--font-keren-hand",
  display: "swap",
  weight: "400",
});
