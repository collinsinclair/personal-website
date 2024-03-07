<div class="flex min-h-screen flex-col items-center justify-center">
	<h1
		class="glow-amber text-center font-['Nasalization'] text-5xl text-amber-400 sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl"
	>
		COLLIN SINCLAIR
	</h1>
	<p
		class="fade-in mt-2 text-center font-['BerkeleyMono'] text-sm text-amber-400 sm:mt-3 sm:text-base md:mt-4 md:text-lg lg:mt-5 lg:text-xl"
	>
		Programmer /// Musician /// Outdoors&nbsp;Enjoyer /// Cat&nbsp;Dad
	</p>
</div>

<style>
	.glow-amber {
		animation: glowing 10s ease-in-out infinite;
	}
	.fade-in {
		animation: fadeIn 5s ease-in-out;
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
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
