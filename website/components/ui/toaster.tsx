"use client";

import { pixelFont } from "@/app/fonts";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `${pixelFont.className} bg-black border flex gap-2 items-center justify-between p-4`,
          info: "border-white text-white",
          error: "border-red-500 text-red-500",
          success: "border-blue-700 text-blue-700",
          description: "opacity-75",
          actionButton: "bg-primary text-primary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
