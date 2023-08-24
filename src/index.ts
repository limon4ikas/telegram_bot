import "dotenv/config";

import { WeatherBotImpl } from "./bot.js";
import { commandsHelp } from "./help.js";
import { getTodayWeather } from "./weather-api.js";

new WeatherBotImpl()
  .createHelp(commandsHelp)
  .addCommand("weather", async (ctx) => {
    const {
      location: { name },
      current: {
        condition: { text },
        temp_c,
        humidity,
        wind_kph,
      },
    } = await getTodayWeather("Saint-Petersburg");

    const result = [
      `Weather at ${name} is:`,
      `${text}`,
      `Temperature is ${temp_c}`,
      `Humidity is ${humidity}`,
      `Wind is ${wind_kph}`,
    ].join("\n");

    ctx.reply(result);
  })
  .addJob("*/10 * * * * *", (bot) => {
    // bot.telegram.sendMessage("716955052", "FROM JOB EVERY 10 seconds");
  })
  .onShutdown(() => console.log("BOT IS SHUTTING DOWN"));
