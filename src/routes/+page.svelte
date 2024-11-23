<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<svelte:head>
	<title>Your Name | Terminal</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fira-code@6.2.0/distr/fira_code.css" />
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
