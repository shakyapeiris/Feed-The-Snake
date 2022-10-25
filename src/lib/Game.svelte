<script lang="ts">
	import Square from '../lib/game/Square.svelte';
	export let score: any;
	export let highestScore: any;
	export let board: any;
</script>

<div class="w-full md:w-max">
	<div class="w-full flex items-center justify-between text-xs sm:text-base">
		<span>Score: {score}</span>
		<span>Highest Score: {highestScore}</span>
	</div>
	<div class="w-full md:w-max border-2 border-solid border-black">
		{#each board as row}
			<div
				class="flex items-center mb-[1px] last:mb-0 justify-between w-full md:w-max"
			>
				{#each row as square}
					<Square object={square} />
				{/each}
			</div>
		{/each}
	</div>
</div>
