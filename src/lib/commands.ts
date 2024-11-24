import type { Command, CommandResult } from './types';
import { getTheme, themes } from './themes';
import { currentTheme } from './stores/theme';
import { get } from 'svelte/store';
import {
	calculateTotalClimbs,
	calculateTotalTime,
	createGradePyramid,
	getMostFrequentPartners
} from './utils/climbing-stats';
import { climbingSessions } from './data/climbing';

// Add these functions at the top level of the file:
function showClimbingStats(): CommandResult {
	const totalClimbs = calculateTotalClimbs();
	const totalMinutes = calculateTotalTime();
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const partners = getMostFrequentPartners(3);

	return {
		content: `
Climbing Statistics
------------------
Total climbs: ${totalClimbs}
Total time: ${hours}h ${minutes}m
Sessions: ${climbingSessions.length}
Top partners: ${partners.map((p) => `${p.name} (${p.sessions})`).join(', ')}`,
		type: 'success'
	};
}

function showClimbingLog(): CommandResult {
	const recentSessions = [...climbingSessions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5)
		.map((session) => {
			const totalClimbs = Object.values(session.grades).reduce((a, b) => a + b, 0);
			const grades = Object.entries(session.grades)
				.map(([grade, count]) => `${grade}×${count}`)
				.join(', ');

			return `
${new Date(session.date).toLocaleDateString()} at ${session.location}
Climbs: ${totalClimbs} (${grades})
Time: ${session.timeOnWall}min
${session.notes ? `Notes: ${session.notes}` : ''}`;
		})
		.join('\n' + '-'.repeat(40) + '\n');

	return {
		content: `
Recent Climbing Sessions
----------------------${recentSessions}`,
		type: 'info'
	};
}

function showGradePyramid(): CommandResult {
	return {
		content: `
Grade Pyramid
------------
${createGradePyramid()}`,
		type: 'info'
	};
}

// Then your commands array continues as before...
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
  climb     - View climbing session data and statistics
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
	},
	{
		name: 'climb',
		description: 'View climbing session data and statistics',
		execute: (args) => {
			if (args.length === 0) {
				return {
					content: `
Available climb commands:
  climb stats   - Show climbing statistics
  climb log     - Show detailed session log
  climb pyramid - Show grade pyramid
  climb view    - Open climbing dashboard

Use 'climb help <command>' for more information.`,
					type: 'info'
				};
			}

			switch (args[0]) {
				case 'stats':
					return showClimbingStats();
				case 'log':
					return showClimbingLog();
				case 'pyramid':
					return showGradePyramid();
				case 'view':
					return { content: 'SHOW_DASHBOARD' }; // Special command we'll handle in Terminal.svelte
				default:
					return {
						content: `Unknown subcommand: ${args[0]}. Type 'climb' for available commands.`,
						type: 'error'
					};
			}
		}
	}
];

export function findCommand(name: string): Command | undefined {
	return commands.find((cmd) => cmd.name === name || cmd.aliases?.includes(name));
}
