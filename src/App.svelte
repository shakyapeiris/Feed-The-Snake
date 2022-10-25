<script lang="ts">
	import Game from './lib/Game.svelte';
	import About from './lib/About.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineReload from 'svelte-icons-pack/ai/AiOutlineReload';
	import BsPlayFill from 'svelte-icons-pack/bs/BsPlayFill';
	import BsPauseFill from 'svelte-icons-pack/bs/BsPauseFill';
	import AiFillInfoCircle from 'svelte-icons-pack/ai/AiFillInfoCircle';
	import { fade, scale } from 'svelte/transition';
	import { swipe } from 'svelte-gestures';
	import { onMount } from 'svelte';

	let playingStatus: string = 'Stop'; // Stop || Play || End
	$: isPlaying = playingStatus == 'Play';

	const squareCount = 20;

	let board = new Array(squareCount)
		.fill(null)
		.map(() => new Array(squareCount).fill(null));
	let snake = [[5, 5]];
	let currDirn: string = 'YD'; // YD, YU, XL, XR
	let apple: null | Array<number> = null;

	let highestScore = localStorage.getItem('hs') || 0;
	let score = 0;

	// Draw the snake and apple
	const drawSnake = () => {
		board = new Array(squareCount)
			.fill(null)
			.map(() => new Array(squareCount).fill(null));

		snake.forEach(([x, y]) => {
			board[y][x] = 'S';
		});

		if (apple) {
			board[apple[1]][apple[0]] = 'A';
		}
	};

	// Get coordinates for an apple
	const getAppleCoordinates = () => {
		const x = Math.round(Math.random() * 100) % squareCount;
		const y = Math.round(Math.random() * 100) % squareCount;
		const coordinates = [x, y];

		if (
			snake.find(([x, y]) => x == coordinates[0] && y == coordinates[1])
		) {
			return getAppleCoordinates();
		}

		return coordinates;
	};

	// Play
	const play = () => {
		if (isPlaying) {
			let prevHead = [snake[0][0], snake[0][1]];
			if (currDirn == 'YD') {
				snake[0][1] = snake[0][1] + 1;
				if (snake[0][1] >= squareCount) {
					snake[0][1] = 0;
				}
			} else if (currDirn == 'YU') {
				snake[0][1] = snake[0][1] - 1;
				if (snake[0][1] < 0) {
					snake[0][1] = squareCount - 1;
				}
			} else if (currDirn == 'XR') {
				snake[0][0] = snake[0][0] + 1;
				if (snake[0][0] >= squareCount) {
					snake[0][0] = 0;
				}
			} else if (currDirn == 'XL') {
				snake[0][0] = snake[0][0] - 1;
				if (snake[0][0] < 0) {
					snake[0][0] = squareCount - 1;
				}
			}
			if (
				snake
					.slice(1, snake.length)
					.find(([x, y]) => x == snake[0][0] && y == snake[0][1])
			) {
				localStorage.setItem('hs', highestScore.toString());
				playingStatus = 'End';
				alert('Oops');
				return;
			}
			for (let i = 1; i < snake.length; i++) {
				const temp = snake[i];
				snake[i] = prevHead;
				prevHead = temp;
			}

			if (
				!apple ||
				(apple[0] == snake[0][0] && apple[1] == snake[0][1])
			) {
				if (apple) {
					snake.push(prevHead);
					score++;
				}

				apple = getAppleCoordinates();
			}
			if (score > highestScore) {
				highestScore = score;
			}
			drawSnake();
		}

		setTimeout(play, 200);
	};

	const togglePlayingStatus = () => {
		if (playingStatus == 'Play') playingStatus = 'Stop';
		else if (playingStatus == 'Stop') playingStatus = 'Play';
		else {
			apple = getAppleCoordinates();
			board = new Array(squareCount)
				.fill(null)
				.map(() => new Array(squareCount).fill(null));
			snake = [[5, 5]];
			currDirn = 'YD'; // YD, YU, XL, XR

			highestScore = localStorage.getItem('hs') || 0;
			score = 0;
			playingStatus = 'Stop';
			drawSnake();
			play();
		}
	};

	// Key event listener
	const onKeyDown = (e) => {
		if (isPlaying) {
			switch (e.key) {
				case 'ArrowUp':
					if (currDirn != 'YD') currDirn = 'YU';
					break;
				case 'ArrowDown':
					if (currDirn != 'YU') currDirn = 'YD';
					break;
				case 'ArrowRight':
					if (currDirn != 'XL') currDirn = 'XR';
					break;
				case 'ArrowLeft':
					if (currDirn != 'XR') currDirn = 'XL';
					break;
			}
		}
		if (e.code == 'Space') {
			togglePlayingStatus();
		}
	};

	let isAbout = false;
	onMount(() => {
		apple = getAppleCoordinates();
		drawSnake();
		play();
		isAbout = true;
	});
</script>

<main class="w-full flex items-start justify-between h-[100vh] font-Trispace">
	{#if isAbout}
		<div
			in:fade
			out:fade
			class="w-full absolute top-0 bg-[#8AC2F5] bg-opacity-40 left-0 min-h-full p-[15px] backdrop-blur-md flex items-center justify-center lg:hidden"
		>
			<About
				on:click={() => {
					isAbout = false;
				}}
			/>
		</div>
	{/if}

	<div class="hidden lg:block w-[30%] h-full"><About /></div>
	<section
		use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
		on:swipe={(e) => {
			if (isPlaying) {
				switch (e.detail.direction) {
					case 'top':
						if (currDirn != 'YD') currDirn = 'YU';
						break;
					case 'bottom':
						if (currDirn != 'YU') currDirn = 'YD';
						break;
					case 'right':
						if (currDirn != 'XL') currDirn = 'XR';
						break;
					case 'left':
						if (currDirn != 'XR') currDirn = 'XL';
						break;
				}
			}
		}}
		class="w-full lg:w-[70%] min-h-full flex items-center justify-between lg:justify-evenly flex-col p-[25px]"
	>
		<div class="w-full flex items-start justify-between lg:hidden">
			<button
				on:click={() => {
					isAbout = true;
				}}
			>
				<Icon src={AiFillInfoCircle} size="1.8rem" color="#8AC2F5" />
			</button>
			<div />
		</div>
		<!-- <div
			class="w-full flex items-start justify-between cursor-pointer h-[30px]"
		>
			<div />
			<button
				on:click={soundChangeHandler}
				class="bg-[#8AC2F5] hover:bg-[#45a4fc] transition-colors w-[25px] h-[25px] rounded-full text-white flex items-center justify-center"
			>
				{#if isSoundOn}
					<Icon src={BsVolumeUpFill} />
				{:else}
					<Icon src={BsFillVolumeMuteFill} />
				{/if}
			</button>
		</div> -->
		<h1 class="font-bold text-4xl w-full text-center">Feed The Snake</h1>
		<Game {highestScore} {score} {board} />
		<button
			on:click={togglePlayingStatus}
			class="bg-[#8AC2F5] hover:bg-[#45a4fc] mt-[5px] transition-colors outline-none w-[50px] h-[50px] rounded-full text-3xl cursor-pointer text-white flex items-center justify-center"
		>
			{#if playingStatus == 'Play'}
				<Icon src={BsPauseFill} />
			{:else if playingStatus == 'Stop'}
				<Icon src={BsPlayFill} />
			{:else}
				<Icon src={AiOutlineReload} color="white" />
			{/if}
		</button>
	</section>
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />
