import client from "@/core/client";
import { isInAllowedChannel, sendChannelError } from "@/core/guards/text-channel";

client.on("messageCreate", async (message) => {
  if (message.content === "say something") {
    if (!isInAllowedChannel(message)) {
      await sendChannelError(message);
      return;
    }
    message.reply("Hello, world!");
  }
});
