import z from "zod";

const EnvSchema = z
  .object({
    BOT_TOKEN: z.string(),
    WEATHER_API_TOKEN: z.string(),
    OPENAI_API_KEY: z.string(),
  })
  .nonstrict();

export const env = EnvSchema.parse(process.env);
