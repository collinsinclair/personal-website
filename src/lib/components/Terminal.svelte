<script lang="ts">
	import { onMount } from 'svelte';
	import { commands, findCommand } from '$lib/commands';
	import type { CommandResult } from '$lib/types';

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
		return commands
			.filter(
				(cmd) => cmd.name.startsWith(input) || cmd.aliases?.some((alias) => alias.startsWith(input))
			)
			.map((cmd) => cmd.name);
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
				currentCommand = completions[0];
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
	}

	.welcome {
		color: #00ff00;
		margin-bottom: 1rem;
		white-space: pre-wrap;
	}

	.prompt {
		color: #00ff00;
		margin-right: 0.5rem;
		user-select: none;
	}

	.command {
		color: #0000ff;
	}

	.input-line {
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}

	input {
		background: transparent;
		border: none;
		color: #fff;
		font-family: inherit;
		font-size: inherit;
		flex-grow: 1;
		outline: none;
	}

	.history-entry {
		margin-bottom: 1rem;
	}

	.output {
		margin-left: 1.5rem;
		white-space: pre-wrap;
		color: #fff;
	}

	.error {
		color: #ff0000;
	}

	.command-line {
		display: flex;
		align-items: center;
	}
</style>
