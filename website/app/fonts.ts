import localFont from "next/font/local";

export const pixelFont = localFont({
  src: [
    {
      path: "./fonts/ContaPixel-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ContaPixel-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-pixel",
});
