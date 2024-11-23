<script lang="ts">
	import { onMount } from 'svelte';
	import { commands, findCommand } from '$lib/commands';
	import type { CommandResult } from '$lib/types';
	import { themes } from '$lib/themes';

	export const focusInput = () => inputElement?.focus();

	interface HistoryEntry {
		command: string;
		output: CommandResult;
	}

	let currentCommand = $state('');
	let commandHistory = $state<HistoryEntry[]>([]);
	let historyIndex = $state(-1);
	let inputElement: HTMLInputElement;

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
			autocomplete="off"
			aria-label="Terminal input"
		/>
	</div>
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
</style>
