<script lang="ts">
	import { onMount } from 'svelte';
	import { commands, findCommand } from '$lib/commands';
	import type { CommandResult } from '$lib/types';
	import { themes } from '$lib/themes';
	import ClimbingDashboard from './ClimbingDashboard.svelte';

	export const focusInput = () => inputElement?.focus();

	interface HistoryEntry {
		command: string;
		output: CommandResult;
	}

	let currentCommand = $state('');
	let commandHistory = $state<HistoryEntry[]>([]);
	let historyIndex = $state(-1);
	let inputElement: HTMLInputElement;
	let showingDashboard = $state(false);

	const welcomeMessage = `Welcome to my personal website!
Type 'help' to see available commands.
Try pressing 'Tab' to autocomplete commands.`;

	function getCompletions(input: string): string[] {
		if (!input) return [];

		const parts = input.split(' ');
		const command = parts[0];
		const arg = parts[1] || '';

		// If we're typing the command name itself
		if (parts.length === 1) {
			return commands
				.filter(
					(cmd) =>
						cmd.name.startsWith(input) || cmd.aliases?.some((alias) => alias.startsWith(input))
				)
				.map((cmd) => cmd.name);
		}

		// Special handling for theme command completions
		if (command === 'theme' && parts.length === 2) {
			return themes
				.map((theme) => theme.name)
				.filter((name) => name.startsWith(arg))
				.map((name) => `theme ${name}`);
		}

		// Add climbing command completions
		if (command === 'climb' && parts.length === 2) {
			const subcommands = ['stats', 'log', 'pyramid', 'view'];
			return subcommands.filter((cmd) => cmd.startsWith(arg)).map((cmd) => `climb ${cmd}`);
		}

		return [];
	}

	async function handleCommand() {
		const trimmedCommand = currentCommand.trim();
		if (!trimmedCommand) return;

		const [commandName, ...args] = trimmedCommand.split(' ');
		const command = findCommand(commandName);

		let result: CommandResult;
		if (!command) {
			result = {
				content: `Command not found: ${commandName}. Type 'help' for available commands.`,
				type: 'error'
			};
		} else {
			result = await command.execute(args);
		}

		if (result.content === 'CLEAR') {
			commandHistory = [];
		} else if (result.content === 'SHOW_DASHBOARD') {
			showingDashboard = true;
			currentCommand = '';
			historyIndex = -1;
			return;
		} else {
			commandHistory = [...commandHistory, { command: trimmedCommand, output: result }];
		}

		currentCommand = '';
		historyIndex = -1;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleCommand();
		} else if (event.key === 'Tab') {
			event.preventDefault();
			const completions = getCompletions(currentCommand);

			if (completions.length === 1) {
				// If there's exactly one match, use it
				currentCommand = completions[0];
			} else if (completions.length > 1) {
				// If there are multiple matches, show them
				commandHistory = [
					...commandHistory,
					{
						command: currentCommand,
						output: {
							content: completions.join('\n'),
							type: 'info'
						}
					}
				];
			}
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				currentCommand = commandHistory[commandHistory.length - 1 - historyIndex].command;
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				currentCommand = commandHistory[commandHistory.length - 1 - historyIndex].command;
			} else {
				historyIndex = -1;
				currentCommand = '';
			}
		} else if (event.key === 'Escape' && showingDashboard) {
			showingDashboard = false;
			focusInput();
		}
	}

	onMount(() => {
		inputElement?.focus();
	});
</script>

<div class="terminal-container" role="application" aria-label="Terminal interface">
	<!-- Welcome message -->
	<pre class="welcome" role="note">{welcomeMessage}</pre>

	<!-- Command history -->
	<div class="history" role="log">
		{#each commandHistory as entry}
			<div class="history-entry">
				<div class="command-line">
					<span class="prompt">$</span>
					<span class="command">{entry.command}</span>
				</div>
				<div class="output" class:error={entry.output.type === 'error'}>
					{entry.output.content}
				</div>
			</div>
		{/each}
	</div>

	<!-- Command input -->
	<div class="input-line">
		<span class="prompt">$</span>
		<input
			bind:this={inputElement}
			bind:value={currentCommand}
			onkeydown={handleKeydown}
			onclick={(e) => e.stopPropagation()}
			type="text"
			spellcheck="false"
			autocapitalize="off"
			autocomplete="off"
			autocorrect="off"
			aria-label="Terminal input"
		/>
	</div>

	{#if showingDashboard}
		<div class="dashboard-overlay" onkeydown={handleKeydown}>
			<div class="dashboard-header">
				<h2>Climbing Dashboard</h2>
				<button class="close-button" onclick={() => (showingDashboard = false)}>
					[ESC to close]
				</button>
			</div>
			<ClimbingDashboard />
		</div>
	{/if}
</div>

<style>
	.terminal-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1.5rem;
		font-family: 'Berkeley Mono', monospace;
		min-height: 60vh;
		background-color: var(--color-background);
		color: var(--color-text);
	}

	.welcome {
		color: var(--color-success);
		margin-bottom: 1rem;
		white-space: pre-wrap;
	}

	.prompt {
		color: var(--color-primary);
		margin-right: 1rem;
		user-select: none;
	}

	.command {
		color: var(--color-secondary);
	}

	.input-line {
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}

	input {
		background: transparent;
		border: none;
		color: var(--color-text);
		font-family: inherit;
		font-size: inherit;
		flex-grow: 1;
		outline: none;
	}

	.history-entry {
		margin-bottom: 1rem;
	}

	.output {
		margin-left: 1rem;
		white-space: pre-wrap;
		color: var(--color-text);
	}

	.error {
		color: var(--color-error);
	}

	.command-line {
		display: flex;
		align-items: center;
	}

	.dashboard-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--color-background);
		overflow-y: auto;
		padding: 2rem;
		z-index: 1000;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--color-primary);
		padding-bottom: 1rem;
	}

	.close-button {
		background: transparent;
		border: 1px solid var(--color-primary);
		color: var(--color-primary);
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: inherit;
	}

	.close-button:hover {
		background: var(--color-primary);
		color: var(--color-background);
	}

	h2 {
		margin: 0;
		color: var(--color-primary);
	}
</style>
