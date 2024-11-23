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
			content: `Hi! I'm [Your Name]

I'm a [your role] who loves building things with code.

Quick links:
  • github   - Visit my GitHub (/github)
  • linkedin - View my LinkedIn profile (/linkedin)
  • email    - Contact me (/email)`,
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
