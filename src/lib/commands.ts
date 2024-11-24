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
import { practiceSessions } from '$lib/data/piano';
import {
	calculatePracticeTimeByGenre,
	calculateTotalPracticeTime,
	getMostPracticedPieces,
	getPieceProgressChart,
	getRepertoireByStatus
} from '$lib/utils/piano-stats';

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
	},
	{
		name: 'piano',
		description: 'View piano practice data and statistics',
		execute: (args) => {
			if (args.length === 0) {
				return {
					content: `
Available piano commands:
  piano log     - Show recent practice sessions
  piano stats   - Show practice statistics
  piano pieces  - Show repertoire status
  piano view    - Open practice dashboard

Use 'piano help <command>' for more information.`,
					type: 'info'
				};
			}

			switch (args[0]) {
				case 'log': {
					const recentSessions = practiceSessions
						.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
						.slice(0, 5)
						.map((session) => {
							const pieces = session.pieces.map((p) => p.piece).join(', ');

							return `
${session.date} (${session.duration}min)
Pieces: ${pieces}
${session.goals ? `Goals achieved: ${session.goals.achieved.join(', ')}` : ''}
${session.notes ? `Notes: ${session.notes}` : ''}`;
						})
						.join('\n' + '-'.repeat(40) + '\n');

					return {
						content: `
Recent Practice Sessions
----------------------${recentSessions}`,
						type: 'info'
					};
				}

				case 'stats': {
					const totalTime = calculateTotalPracticeTime(30);
					const genreTimes = calculatePracticeTimeByGenre(30);
					const mostPracticed = getMostPracticedPieces(30, 3);

					return {
						content: `
Practice Statistics (Last 30 Days)
-------------------------------
Total practice time: ${Math.floor(totalTime / 60)}h ${totalTime % 60}m

Time by genre:
  Classical:       ${Math.floor(genreTimes['Classical'] / 60)}h ${Math.round(genreTimes['Classical'] % 60)}m
  Jazz:           ${Math.floor(genreTimes['Jazz'] / 60)}h ${Math.round(genreTimes['Jazz'] % 60)}m
  Musical Theatre: ${Math.floor(genreTimes['Musical Theatre'] / 60)}h ${Math.round(genreTimes['Musical Theatre'] % 60)}m

Most practiced pieces:
${mostPracticed.map((p) => `  ${p.name}: ${Math.floor(p.minutes / 60)}h ${Math.round(p.minutes % 60)}m`).join('\n')}`,
						type: 'info'
					};
				}

				case 'pieces': {
					const repertoire = getRepertoireByStatus();
					const sections = ['Active', 'Paused', 'Completed'] as const;

					const content = sections
						.map(
							(status) => `
${status} Pieces
${'-'.repeat(status.length + 7)}
${repertoire[status]
	?.map(
		(piece) =>
			`${piece.name} (${piece.genre})
 ${getPieceProgressChart(piece.name)}`
	)
	.join('\n')}`
						)
						.join('\n');

					return {
						content,
						type: 'info'
					};
				}

				case 'view':
					return { content: 'SHOW_PIANO_DASHBOARD' };

				default:
					return {
						content: `Unknown subcommand: ${args[0]}. Type 'piano' for available commands.`,
						type: 'error'
					};
			}
		}
	}
];

export function findCommand(name: string): Command | undefined {
	return commands.find((cmd) => cmd.name === name || cmd.aliases?.includes(name));
}
