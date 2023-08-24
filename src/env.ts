import z from "zod";

const EnvSchema = z.object({ BOT_TOKEN: z.string() }).nonstrict();

export const env = EnvSchema.parse(process.env);
