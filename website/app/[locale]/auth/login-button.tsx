"use client";

import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useCallback } from "react";
import { toast } from "sonner";

export default function LoginButton() {
  const handleLogin = useCallback(async () => {
    const result = await authClient.signIn.social({
      provider: "discord",
      callbackURL: process.env.NEXT_PUBLIC_APP_URL + "/me",
      newUserCallbackURL: process.env.NEXT_PUBLIC_APP_URL + "/me#newUser",
    });

    if (result.error) {
      toast.error(result.error.message ?? "An unknown error occurred");
    }
  }, []);

  return <Button onClick={handleLogin}>Login with Discord</Button>;
}
