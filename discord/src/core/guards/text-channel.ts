import { ChannelType, Message, type CommandInteraction } from "discord.js";

const ALLOWED_CHANNEL_ID = "1296547272569651250"; // Replace with the ID of the channel where commands are allowed

/**
 * Checks if an interaction or message is in the allowed channel.
 * If not, it replies with an error message and returns true.
 * @param entity The message or interaction to check.
 * @returns `true` if the entity is from a disallowed channel, `false` otherwise.
 */
export async function isInvalidChannel(entity: Message | CommandInteraction): Promise<boolean> {
  if (entity.channel?.type !== ChannelType.GuildText || entity.channel.id !== ALLOWED_CHANNEL_ID) {
    const reply = `Rooooaaarrr!! I can only execute commands in the channel <#${ALLOWED_CHANNEL_ID}>.`;
    
    if (entity instanceof Message) {
      await entity.reply(reply);
    } else {
      await entity.reply({ content: reply, ephemeral: true });
    }

    return true;
  }

  return false;
} 