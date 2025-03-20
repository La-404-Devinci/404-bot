import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Swords, Trophy } from "lucide-react";

export default function Dock() {
  const links = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/me",
    },

    {
      title: "Leaderboard",
      icon: (
        <Trophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/leaderboard",
    },
    {
      title: "Challenges",
      icon: (
        <Swords className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/challenges",
    },
  ];

  return (
    <FloatingDock
      items={links}
      mobileClassName="fixed bottom-4 right-4"
      desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
    />
  );
}
