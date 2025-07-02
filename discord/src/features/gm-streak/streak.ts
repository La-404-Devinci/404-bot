import redis from "@/core/database";
import { DateTime } from "luxon";
import { SlashCommandBuilder } from "discord.js";
import client from "@/core/client";
import { isInAllowedChannel, sendChannelError } from "@/core/guards/text-channel";

const streakCommand = new SlashCommandBuilder().setName("gm-streak").setDescription("Check your gm streak");

client.on("ready", async () => {
  if (!client.application) return;

  const guilds = client.guilds.cache;
  for (const [_, guild] of guilds) {
    await guild.commands.create(streakCommand);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName !== "gm-streak") return;
  if (!isInAllowedChannel(interaction)) {
    await sendChannelError(interaction);
    return;
  }

  const userId = interaction.user.id;
  const streak = parseInt((await redis.get(`user:${userId}:gm:streak`)) || "0");
  const lastGm = DateTime.fromSeconds(parseInt((await redis.get(`user:${userId}:gm:last`)) || "0"));

  const now = DateTime.now();
  const isSameDay = lastGm.hasSame(now, "day");

  const nextGm = lastGm.plus({ days: 1 }).startOf("day");

  let response = `**You said "gm" ${streak} times in a row!** 🔥`;

  if (streak > 0) {
    if (!isSameDay) {
      response += `\n> ⚠️ Don't forget to say "gm" today to keep your streak!`;
    } else {
      response += `\n> 🔥 Don't forget to say "gm" again ${nextGm.toRelative()}!`;
    }
  } else {
    response += `\nSay "gm" in the chat to start your streak!`;
  }

  await interaction.reply({ content: response, flags: "Ephemeral" });
});
