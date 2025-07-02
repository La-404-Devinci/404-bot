import { ChannelType, Message, type CommandInteraction } from "discord.js";

const ALLOWED_CHANNEL_ID = "1296547272569651250"; // Replace with the ID of the channel where commands are allowed

/**
 * Determines whether a Discord message or command interaction originates from the allowed text channel.
 *
 * If the entity is from a disallowed channel, sends a reply indicating that commands are restricted to the specified channel and returns `true`. Otherwise, returns `false`.
 *
 * @param entity - The Discord message or command interaction to check
 * @returns `true` if the entity is from a disallowed channel; `false` if it is from the allowed channel
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