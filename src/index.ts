import "dotenv/config";

import { WeatherBotImpl } from "./bot";
import { commandsHelp } from "./help";

new WeatherBotImpl()
  .createHelp(commandsHelp)
  .addCommand("weather", (ctx) => {
    console.log(ctx.chat.id);
    ctx.reply("HERE,s ruor wheather");
  })
  .addJob("*/10 * * * * *", (bot) => {
    // bot.telegram.sendMessage("716955052", "FROM JOB EVERY 10 seconds");
  })
  .onShutdown(() => console.log("BOT IS SHUTTING DOWN"));
