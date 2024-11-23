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
		padding: 1rem;
	}

	:global(body) {
		margin: 0;
		color: #f0f0f0;
	}
</style>
