<script lang="ts">
	import Square from '../lib/game/Square.svelte';
	export let score: any;
	export let highestScore: any;
	export let board: any;
</script>

<div class="w-max">
	<div class="w-full flex items-center justify-between">
		<span>Score: {score}</span>
		<span>Highest Score: {highestScore}</span>
	</div>
	<div class="w-max border-2 border-solid border-black">
		{#each board as row}
			<div
				class="flex items-center mb-[1px] last:mb-0 justify-between w-max"
			>
				{#each row as square}
					<Square object={square} />
				{/each}
			</div>
		{/each}
	</div>
</div>
