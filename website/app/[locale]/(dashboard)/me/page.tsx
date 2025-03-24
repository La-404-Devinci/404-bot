"use server";

import Lanyard from "@/components/ui/lanyard";

export default async function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="text-sm text-gray-500">This is the dashboard page.</p>
      </div>
      <Lanyard />
    </>
  );
}
