import type { Command } from './types';
import { getTheme, themes } from './themes';
import { currentTheme } from './stores/theme';
import { get } from 'svelte/store';

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
  theme     - Change color theme
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
			content: `
Ahoy! I'm Collin, I'm a software engineer and theatre music director. I live in Denver, CO. with my partner Gabrielle and our son Jupiter (who is a cat).`,
			type: 'success'
		})
	},
	{
		name: 'theme',
		description: 'Change the color theme',
		execute: (args) => {
			if (args.length === 0) {
				return {
					content: `
Available themes:
${[...themes]
	.sort((a, b) => a.name.localeCompare(b.name))
	.map((t) => `  ${t.name} - ${t.label}`)
	.join('\n')}

Current theme: ${get(currentTheme)}

Usage: theme <theme-name>`,
					type: 'info'
				};
			}

			const themeName = args[0];
			const theme = getTheme(themeName);

			if (theme.name === 'default' && themeName !== 'default') {
				return {
					content: `Theme '${themeName}' not found. Use 'theme' to see available themes.`,
					type: 'error'
				};
			}

			currentTheme.set(theme.name);
			return {
				content: `Theme changed to ${theme.label}`,
				type: 'success'
			};
		}
	},
	{
		name: 'clear',
		description: 'Clear the terminal',
		execute: () => ({ content: 'CLEAR' })
	}
];

export function findCommand(name: string): Command | undefined {
	return commands.find((cmd) => cmd.name === name || cmd.aliases?.includes(name));
}
