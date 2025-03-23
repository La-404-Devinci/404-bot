"use server";

import React from "react";
import { redirect } from "next/navigation";
import Dock from "./_components/dock";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  if (!true) redirect("/login");

  return (
    <main className="flex h-screen w-screen flex-col">
      {children}
      <Dock />
    </main>
  );
}
