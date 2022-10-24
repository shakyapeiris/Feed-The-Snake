<script lang="ts">
	import Game from './lib/Game.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineReload from 'svelte-icons-pack/ai/AiOutlineReload';
	import BsVolumeUpFill from 'svelte-icons-pack/bs/BsVolumeUpFill';
	import BsFillVolumeMuteFill from 'svelte-icons-pack/bs/BsVolumeMuteFill';
	import BsPlayFill from 'svelte-icons-pack/bs/BsPlayFill';
	import BsPauseFill from 'svelte-icons-pack/bs/BsPauseFill';
	import BsFacebook from 'svelte-icons-pack/bs/BsFacebook';
	import BsInstagram from 'svelte-icons-pack/bs/BsInstagram';
	import BsLinkedin from 'svelte-icons-pack/bs/BsLinkedin';
	import BsTwitter from 'svelte-icons-pack/bs/BsTwitter';
	import BsGithub from 'svelte-icons-pack/bs/BsGithub';
	import { onMount } from 'svelte';
	import FaqItem from './lib/FAQItem.svelte';

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

	onMount(() => {
		apple = getAppleCoordinates();
		drawSnake();
		play();
	});
</script>

<main class="w-full flex items-start justify-between h-[100vh] font-Trispace">
	<section
		class="w-[30%] py-[15px] min-h-full bg-gradient-to-t from-[#006BA7] to-[#A4F6F2] text-white flex items-start justify-evenly flex-col"
	>
		<!-- <img class="h-[200px] w-auto" src={Narrator} alt="narrator-img" /> -->
		<div class="p-[15px]">
			<h2 class="font-bold text-4xl mb-[5px] w-full">Hey!</h2>
			<p class="text-md font-light">
				Your loving snake is starving! Help her to locate the food or
				she will locate you 😉
			</p>
		</div>
		<div class="w-full p-[15px]">
			<h2 class="font-bold text-4xl mb-[5px] w-full">FAQ</h2>
			<FaqItem question="How to play the game?"
				><p slot="answer">
					Press the play button and navigate the snake towards apples
					using arrow keys
				</p></FaqItem
			>
			<FaqItem question="How to contribute to this project?"
				><p slot="answer">
					Checkout this <a href="/#/" class="underline">Repository</a>
				</p></FaqItem
			>
			<FaqItem question="Who developed this?"
				><p slot="answer">
					Hi I'm Shakya Peiris. I'm currently studying at Ananda
					College, Colombo 10
				</p></FaqItem
			>
			<FaqItem question="I lost my snake! What should I do now?"
				><p slot="answer">Ummm...</p></FaqItem
			>
		</div>
		<div class="p-[15px] w-full">
			<h2 class="font-bold text-4xl mb-[5px] w-full">Contact</h2>
			<p
				class="text-md font-light flex items-center justify-between w-max mb-[15px]"
			>
				<a
					href="https://github.com/shakyapeiris"
					class="cursor-pointer mr-[20px]"
					target="_blank"
					rel="noreferrer"><Icon src={BsGithub} size="1.6rem" /></a
				>
				<a
					href="https://www.linkedin.com/in/shakyapeiris/"
					class="cursor-pointer mr-[20px]"
					target="_blank"
					rel="noreferrer"><Icon src={BsLinkedin} size="1.6rem" /></a
				>
				<a
					href="https://twitter.com/Shakya55007271"
					class="cursor-pointer mr-[20px]"
					target="_blank"
					rel="noreferrer"><Icon src={BsTwitter} size="1.6rem" /></a
				>
			</p>
			<a
				href="https://www.buymeacoffee.com/thep33ra"
				target="_blank"
				rel="noreferrer"
				class="w-max"
				><img
					src="https://helloimjessa.files.wordpress.com/2021/06/bmc-button.png"
					alt="buymeacoffee"
					class="h-[40px] w-auto"
				/></a
			>
		</div>
	</section>
	<section
		class="w-[70%] h-full flex items-center justify-evenly flex-col px-[25px]"
	>
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
		<h1 class="font-bold text-4xl">Feed The Snake</h1>
		<Game {highestScore} {score} {board} />
		<button
			on:click={togglePlayingStatus}
			class="bg-[#8AC2F5] hover:bg-[#45a4fc] transition-colors outline-none w-[50px] h-[50px] rounded-full text-3xl cursor-pointer text-white flex items-center justify-center"
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
