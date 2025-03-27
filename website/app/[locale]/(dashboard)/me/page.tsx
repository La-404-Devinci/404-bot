"use server";

import Lanyard from "@/components/ui/lanyard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="text-sm text-gray-500">This is the dashboard page.</p>
      </div>
      <Lanyard cardImage={`/api/image/card?id=${session?.user?.id}`} />
    </>
  );
}
