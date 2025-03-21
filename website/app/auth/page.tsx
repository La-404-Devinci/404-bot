"use client";

import Dither from "@/components/background/dither";
import Card from "@/components/ui/card";
import LoginButton from "./login-button";

export default async function AuthPage() {
  return (
    <>
      <div className="absolute inset-0 -z-10 opacity-30">
        <Dither
          pixelSize={3}
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={3.5}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <main className="flex flex-col items-center justify-center h-screen">
        <Card title="Access the Headquarters">
          <p className="text-white/80 mb-8">
            Start earning points by logging in with your Discord account.
            <br />
            You must be a member of the <code>404</code> server to login.
          </p>
          <LoginButton />
        </Card>
      </main>
    </>
  );
}
