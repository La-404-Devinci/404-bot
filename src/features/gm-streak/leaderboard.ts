import client from "core/client";
import redis from "core/database";
import { SlashCommandBuilder } from "discord.js";

const leaderboardCommand = new SlashCommandBuilder()
  .setName("gm-leaderboard")
  .setDescription("Check the gm leaderboard");

client.on("ready", async () => {
  if (!client.application) return;

  const guilds = client.guilds.cache;
  for (const [_, guild] of guilds) {
    await guild.commands.create(leaderboardCommand);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName !== "gm-leaderboard") return;

  const result = await redis.keys("user:*:gm:streak");

  // Create the leaderboard
  const leaderboard = (
    await Promise.all(
      result.map(async (user) => {
        const userId = user.split(":")[1];
        const streak = parseInt((await redis.get(`user:${userId}:gm:streak`)) || "0");
        return { userId, streak };
      })
    )
  )
    .filter((user) => user.streak > 0)
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 10);

  // Fetch user nicknames
  const userLeaderboard = await Promise.all(
    leaderboard.map(async (user) => {
      const userId = user.userId;
      const userData = await client.users.fetch(userId);
      return { nickname: userData.displayName, streak: user.streak };
    })
  );

  // Format the leaderboard data to text
  const formattedLeaderboard = [
    "## Here are some tryharders 🔥",
    ...userLeaderboard.map((user, index) => {
      let prefix = `${index + 1}. `;

      if (index === 0) prefix = "🥇 ";
      else if (index === 1) prefix = "🥈 ";
      else if (index === 2) prefix = "🥉 ";

      return `- ${prefix}${user.nickname} (${user.streak} GMs)`;
    })
  ].join("\n");

  await interaction.reply({ content: formattedLeaderboard });
});
