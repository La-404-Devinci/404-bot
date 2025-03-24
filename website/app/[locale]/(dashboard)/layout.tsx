"use server";

import React from "react";
import { redirect } from "next/navigation";
import Dock from "./_components/dock";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <main className="flex h-screen w-screen flex-col">
      {children}
      <Dock />
    </main>
  );
}
