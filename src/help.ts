export const commandsHelp = {
  help: "Get commands list",
  start: "Start bot",
  quit: "Quit bot",
  weather: "Get current weather",
} as const;

export type Commands = keyof typeof commandsHelp;
