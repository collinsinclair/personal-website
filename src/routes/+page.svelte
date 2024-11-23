<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<svelte:head>
	<title>Collin Sinclair</title>
</svelte:head>

<main>
	<Terminal />
</main>

<style>
	main {
		min-height: 100vh;
		background: #121212;
		padding: 1rem;
	}

	:global(body) {
		margin: 0;
		background: #121212;
		color: #f0f0f0;
	}
</style>
