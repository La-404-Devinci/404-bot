import redis from "@/core/database";
import { CronJob } from "cron";
import client from "@/core/client";
import { DateTime } from "luxon";

CronJob.from({
  cronTime: "1 0 0 * * *", // 12:00:01 AM every day
  //   cronTime: "1 */1 * * * *", // every minute
  start: true,
  onTick: async () => {
    const users = await redis.keys("user:*:gm:message");

    for (const user of users) {
      const userId = user.split(":")[1];

      const messageId = await redis.get(`user:${userId}:gm:message`);
      const channelId = await redis.get(`user:${userId}:gm:channel`);

      const lastGm = DateTime.fromSeconds(parseInt((await redis.get(`user:${userId}:gm:last`)) || "0"));

      const now = DateTime.now();

      // TODO: it's 2 am and there is surely a better way to do this, but i wanna go to sleep
      const delayedLastGm = lastGm.plus({ days: 1 });
      const isSameDay = delayedLastGm.hasSame(now, "day") || lastGm.hasSame(now, "day");

      if (!isSameDay) {
        // Reply to the last "gm" message
        const channel = await client.channels.fetch(channelId!);

        if (channel?.isTextBased()) {
          const message = await channel.messages.fetch(messageId!);
          await message.reply("Oops! Seems like you didn't say gm today!");
        }

        // Delete the message and last gm
        await redis.del(`user:${userId}:gm:message`);
        await redis.del(`user:${userId}:gm:channel`);
        await redis.del(`user:${userId}:gm:last`);

        await redis.set(`user:${userId}:gm:streak`, "0");
      }
    }
  }
});
