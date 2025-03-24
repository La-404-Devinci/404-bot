import LetterGlitch from "@/components/background/letter-glitch";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main>
      <LetterGlitch
        glitchSpeed={100}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
        className="absolute inset-0 -z-10"
      />
      <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-lg">{t("description")}</p>
      </div>
    </main>
  );
}
