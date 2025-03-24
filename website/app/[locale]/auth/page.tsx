"use server";

import Dither from "@/components/background/dither";
import Card from "@/components/ui/card";
import LoginButton from "./login-button";
import { getTranslations } from "next-intl/server";

export default async function AuthPage() {
  const t = await getTranslations("auth");

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
        <Card title={t("title")} footer={<LoginButton />}>
          <p className="text-white/80 mb-8">{t("description")}</p>
        </Card>
      </main>
    </>
  );
}
