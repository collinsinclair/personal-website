<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';

	let terminalComponent: { focusInput: () => void };

	function handleInteraction() {
		terminalComponent.focusInput();
	}
</script>

<svelte:head>
	<title>Collin Sinclair</title>
</svelte:head>

<main>
	<button
		class="viewport-button"
		on:click={handleInteraction}
		on:keydown={handleInteraction}
		aria-label="Click anywhere to focus terminal input"
	>
		<Terminal bind:this={terminalComponent} />
	</button>
</main>

<style>
	main {
		min-height: 100vh;
	}

	.viewport-button {
		display: block;
		width: 100%;
		/*min-height: 100vh;*/
		padding: 1rem;
		margin: 0;
		border: none;
		background: none;
		cursor: default;
		text-align: left;
	}

	:global(body) {
		margin: 0;
		color: #f0f0f0;
	}
</style>
