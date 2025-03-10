import client from "core/client";
import redis from "core/database";
import { DateTime } from "luxon";

client.on("messageCreate", async (message) => {
  if (!message.content.toLowerCase().startsWith("gm")) return;

  const userId = message.author.id;
  const streak = parseInt((await redis.get(`user:${userId}:gm:streak`)) || "0");
  const lastGm = DateTime.fromSeconds(parseInt((await redis.get(`user:${userId}:gm:last`)) || "0"));

  const now = DateTime.now();
  const isSameDay = lastGm.hasSame(now, "day");

  if (isSameDay) {
    await message.react("❌");
    return;
  }

  const newStreak = streak + 1;

  await redis.set(`user:${userId}:gm:streak`, newStreak.toString());
  await redis.set(`user:${userId}:gm:last`, now.toSeconds().toString());
  await redis.set(`user:${userId}:gm:message`, message.id);
  await redis.set(`user:${userId}:gm:channel`, message.channel.id);

  // Send streak update message
  await message.react("🔥");
});
