export const commandsHelp = {
	start: "Welcome message",
	help: "Get commands list",
	weather: "Get current weather",
	ask: "What to wear for today?",
} as const;

export type Commands = keyof typeof commandsHelp;
