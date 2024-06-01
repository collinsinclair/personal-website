<script>
	import hacker from '$lib/img/hacker.webp';
	import piano from '$lib/img/piano.avif';
	import ridge from '$lib/img/mountain-ridge.avif';
	import collin from '$lib/img/collin.avif';
	let items = [
		{ label: 'Programming', href: '/programming', img: hacker },
		{ label: 'Music', href: '/music', img: piano },
		{ label: 'Adventures', href: '/adventures', img: ridge },
		{ label: 'About', href: '/about', img: collin }
	];
</script>

<div class="grid h-screen grid-cols-2 place-content-center gap-4 md:grid-cols-3 lg:grid-cols-4">
	{#each items as item, i (i)}
		<a
			href={item.href}
			class="hoverable relative flex aspect-square items-center justify-center rounded-lg border-2 border-amber-400 text-center font-['BerkeleyMono'] text-lg tracking-widest text-amber-400 hover:border-0 lg:text-2xl"
		>
			<img src={item.img} alt={item.label} class="link-image" />
			<span class="link-text">
				{item.label.toUpperCase()}
			</span>
		</a>
	{/each}
</div>

<style>
	.link-image {
		transition: opacity 0.3s;
		opacity: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
	}
	.link-text {
		transition: opacity 0.3s;
		opacity: 1;
		z-index: 10;
		position: relative;
	}
	.hoverable:hover .link-image {
		opacity: 1;
	}
	.hoverable:hover .link-text {
		opacity: 0;
	}
</style>
