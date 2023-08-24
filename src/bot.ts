import { Composer, Context, Telegraf } from "telegraf";
import { Update } from "telegraf/types";
import cron from "node-cron";

import { env } from "./env.js";
import { Commands } from "./help.js";

interface WeatherBot {}

export class WeatherBotImpl implements WeatherBot {
  private bot = new Telegraf(env.BOT_TOKEN);

  constructor() {
    console.log("STARTING BOT...");
    this.bot.command("quit", async (ctx) => await ctx.leaveChat());
    this.bot.launch();
  }

  public setCommandsMenu(commands: Record<Commands, string>) {
    this.bot.telegram.setMyCommands(
      Object.entries(commands)
        .filter(([command]) => command !== "start")
        .map(([command, description]) => ({
          command,
          description,
        }))
    );

    return this;
  }

  public addCommand(
    command: Commands,
    handler: Parameters<Composer<Context<Update>>["command"]>[1]
  ) {
    this.bot.command(command, handler);

    return this;
  }

  public addJob(
    expression: string,
    callback: (bot: Telegraf<Context<Update>>) => void
  ) {
    const isValid = cron.validate(expression);

    if (!isValid) {
      console.error("Not valid CRON expression");
      return this;
    }

    cron.schedule(expression, () => {
      callback(this.bot);
    });

    return this;
  }

  public createHelp(help: Record<Commands, string>) {
    this.bot.help((ctx) =>
      ctx.reply(
        Object.entries(help)
          .map(([command, helpMessage]) => `/${command} ${helpMessage}`)
          .join("\n")
      )
    );

    return this;
  }

  public onShutdown(callback: () => void) {
    process.once("SIGINT", () => {
      this.bot.stop("SIGINT");
      callback();
    });

    process.once("SIGTERM", () => {
      callback();
      this.bot.stop("SIGTERM");
    });

    return this;
  }
}
