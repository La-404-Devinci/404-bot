import "dotenv/config";
import client from "@/core/client";

// Load bootstrap
import "@/core/bootstrap/clear";

// Load features
import "@/features/test";

import "@/features/gm-streak/cron";
import "@/features/gm-streak/registrer";
import "@/features/gm-streak/streak";
import "@/features/gm-streak/leaderboard";

// Start the client
client.login(process.env.TOKEN);
