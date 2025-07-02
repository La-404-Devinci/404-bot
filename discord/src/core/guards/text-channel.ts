import { ChannelType, Message, type CommandInteraction } from "discord.js";

const ALLOWED_CHANNEL_ID = process.env.DISCORD_ALLOWED_CHANNEL_ID || "1296547272569651250";

/**
 * Validates if an entity is in the allowed channel (pure function, no side effects).
 */
export function isInAllowedChannel(entity: Message | CommandInteraction): boolean {
  return entity.channel?.type === ChannelType.GuildText &&
    entity.channel.id === ALLOWED_CHANNEL_ID;
}

/**
 * Sends a channel restriction error message to the user (side effect only).
 */
export async function sendChannelError(entity: Message | CommandInteraction): Promise<void> {
  const reply = `Rooooaaarrr!! I can only execute commands in the channel <#${ALLOWED_CHANNEL_ID}>.`;
  try {
    if (entity instanceof Message) {
      await entity.reply(reply);
    } else {
      await entity.reply({ content: reply, ephemeral: true });
    }
  } catch (error) {
    console.error('Failed to send channel restriction message:', error);
  }
}