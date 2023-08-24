import "dotenv/config";

import { WeatherBotImpl } from "./bot.js";
import { commandsHelp } from "./help.js";
import { getTodayWeather } from "./weather-api.js";
import { openAi } from "./ai.js";

new WeatherBotImpl()
  .createHelp(commandsHelp)
  .addCommand("start", async (ctx) => {
    const welcomeMessage = Object.entries(commandsHelp)
      .filter(([command]) => command !== "start")
      .map(([command, desc]) => `/${command} ${desc}`)
      .join("\n");

    ctx.reply(welcomeMessage);
  })
  .addCommand("ask", async (ctx) => {
    ctx.reply("Give me a moment to analyze forecast...");

    const { forecast } = await getTodayWeather("Saint-Petersburg");

    const completion = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You will be provided weather data for a single day. Give a list of appropriate clothes to wear according to temperature and precipitation. Clothes needed for top and bottom and shoes. Use emojis for clothes in the reply. Prefer using °C. After summary wish a good day in a funny manner with reference to cats`,
        },
        {
          role: "user",
          content: JSON.stringify({ forecast: forecast.forecastday[0]?.day }),
        },
      ],
      model: "gpt-3.5-turbo",
    });

    ctx.reply(completion.choices[0]?.message.content ?? "");
  })
  .addCommand("weather", async (ctx) => {
    ctx.reply("Let me checkout the weather for you...");

    const { current } = await getTodayWeather("Saint-Petersburg");
    const completion = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You will be provided current weather data and you need and display data summary. Add emojis to the result. Use newlines for each property. Prefer using °C. After summary wish a good day in a funny manner with reference to cats",
        },
        { role: "user", content: JSON.stringify(current) },
      ],
      model: "gpt-3.5-turbo",
    });

    ctx.reply(completion.choices[0]?.message.content ?? "");
  })
  .setCommandsMenu(commandsHelp)
  .onShutdown(() => console.log("BOT IS SHUTTING DOWN"));
