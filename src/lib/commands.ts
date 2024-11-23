import type { Command } from './types';

export const commands: Command[] = [
	{
		name: 'help',
		description: 'Show available commands',
		aliases: ['h', '?'],
		execute: () => ({
			content: `
Available commands:
  help      - Show this help message
  about     - Learn about me
  blog      - View my blog posts
  piano     - View piano practice logs
  projects  - Browse my projects
  clear     - Clear the terminal
  
Navigation tips:
  • Use Tab to autocomplete commands
  • Press ↑/↓ to navigate command history
  • Type 'help <command>' for detailed info`,
			type: 'info'
		})
	},
	{
		name: 'about',
		description: 'Learn about me',
		execute: () => ({
			content: `Ahoy! I'm Collin, I'm a software engineer and theatre music director. I live in Denver, CO. with my partner Gabrielle and our son Jupiter (who is a cat).`,
			type: 'success'
		})
	},
	{
		name: 'clear',
		description: 'Clear the terminal',
		execute: () => ({ content: 'CLEAR' }) // We'll handle this specially
	}
];

export function findCommand(name: string): Command | undefined {
	return commands.find((cmd) => cmd.name === name || cmd.aliases?.includes(name));
}
