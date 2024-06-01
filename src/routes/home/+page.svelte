<script>
	let items = [
		{ label: 'Programming', href: '/programming' },
		{ label: 'Music', href: '/music' },
		{ label: 'Adventures', href: '/adventures' },
		{ label: 'About', href: '/about' }
	];
</script>

<div class="grid h-screen grid-cols-2 place-content-center gap-4 md:grid-cols-3 lg:grid-cols-4">
	{#each items as item, i (i)}
		<a
			href={item.href}
			class="flex aspect-square items-center justify-center rounded-lg border-2 border-amber-400 text-center font-['BerkeleyMono'] text-lg tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black lg:text-2xl"
		>
			{item.label.toUpperCase()}
		</a>
	{/each}
</div>
