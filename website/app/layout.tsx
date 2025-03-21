import type { Metadata } from "next";
import { pixelFont } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 404 Headquarters",
  description:
    "Join us in the 404 Headquarters, earn points by completing challenges, and unlock new badges, and be the first on the leaderboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelFont.className} antialiased`}>{children}</body>
    </html>
  );
}
