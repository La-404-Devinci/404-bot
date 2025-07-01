import client from "@/core/client";
import { isInvalidChannel } from "@/core/guards/text-channel";

client.on("messageCreate", async (message) => {
  if (message.content === "say something") {
    if (await isInvalidChannel(message)) return;
    message.reply("Hello, world!");
  }
});
