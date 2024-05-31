<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let description = 'Programmer /// Musician /// Outdoors\u00A0Enjoyer /// Cat\u00A0Dad';
	let displayDescription = '';
	let typingCompleted = false;

	onMount(() => {
		let i = 0;
		const typingInterval = setInterval(() => {
			if (i < description.length) {
				displayDescription += description[i];
				i++;
			} else {
				clearInterval(typingInterval);
				typingCompleted = true;
			}
		}, 100);
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1
		class="glow-amber text-center font-['Nasalization'] text-6xl text-amber-400 md:text-7xl lg:text-8xl"
	>
		COLLIN SINCLAIR
	</h1>
	<p
		class="mt-2 text-center font-['BerkeleyMono'] text-sm text-amber-400 sm:mt-3 sm:text-base md:mt-4 md:text-lg lg:mt-5 lg:text-xl"
	>
		{displayDescription}
	</p>
	{#if typingCompleted}
		<button
			class="mt-5 rounded border-2 border-amber-400 px-6 py-2 font-['BerkeleyMono'] text-amber-400 transition-colors duration-300 hover:bg-amber-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50"
			in:fade={{ delay: 500, duration: 700 }}
		>
			ENTER
		</button>
	{:else}
		<div class="invisible">
			<button
				class="mt-5 rounded border-2 border-amber-400 px-6 py-2 font-['BerkeleyMono'] text-amber-400 transition-colors duration-300 hover:bg-amber-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50"
			>
				ENTER
			</button>
		</div>
	{/if}
</div>

<style>
	.glow-amber {
		animation: glowing 10s ease-in-out infinite;
	}

	@keyframes glowing {
		0% {
			text-shadow:
				0 0 5px rgba(240, 191, 74, 0.4),
				0 0 10px rgba(240, 191, 74, 0.3),
				0 0 15px rgba(240, 191, 74, 0.2),
				0 0 20px rgba(240, 191, 74, 0.1);
		}
		50% {
			text-shadow:
				0 0 10px rgba(240, 191, 74, 0.6),
				0 0 20px rgba(240, 191, 74, 0.5),
				0 0 30px rgba(240, 191, 74, 0.4),
				0 0 40px rgba(240, 191, 74, 0.3);
		}
		100% {
			text-shadow:
				0 0 5px rgba(240, 191, 74, 0.4),
				0 0 10px rgba(240, 191, 74, 0.3),
				0 0 15px rgba(240, 191, 74, 0.2),
				0 0 20px rgba(240, 191, 74, 0.1);
		}
	}
</style>
