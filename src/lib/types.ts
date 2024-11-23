export interface CommandResult {
	content: string;
	type?: 'error' | 'success' | 'info';
}

export interface Command {
	name: string;
	description: string;
	aliases?: string[];
	execute: (args: string[]) => Promise<CommandResult> | CommandResult;
}
