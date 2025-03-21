"use client";

import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useCallback, useState } from "react";

export default function LoginButton() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    setError(null);

    const result = await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/me",
      newUserCallbackURL: "/me?newUser=true",
    });

    if (result.error) {
      setError(result.error.message ?? "An unknown error occurred");
    }
  }, []);

  return (
    <>
      <Button onClick={handleLogin}>Login with Discord</Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
