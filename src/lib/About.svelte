<script>
	import FaqItem from './FAQItem.svelte';
	import Icon from 'svelte-icons-pack';
	import BsLinkedin from 'svelte-icons-pack/bs/BsLinkedin';
	import BsTwitter from 'svelte-icons-pack/bs/BsTwitter';
	import BsGithub from 'svelte-icons-pack/bs/BsGithub';
	import FaWindowClose from 'svelte-icons-pack/fa/FaWindowClose';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<section
	class="w-[100%] rounded-sm lg:rounded-none py-[15px] md:w-2/3 lg:w-full lg:min-h-full bg-gradient-to-t from-[#006BA7] to-[#A4F6F2] text-white flex items-start justify-evenly flex-col"
>
	<div class="lg:hidden flex items-center justify-between w-full px-[20px]">
		<div />
		<button
			on:click={() => {
				dispatch('click');
			}}><Icon src={FaWindowClose} color="white" size="1.8rem" /></button
		>
	</div>
	<!-- <img class="h-[200px] w-auto" src={Narrator} alt="narrator-img" /> -->
	<div class="p-[15px]">
		<h2 class="font-bold text-4xl mb-[5px] w-full">Hey!</h2>
		<p class="text-md font-light">
			Your loving snake is starving! Help her to locate the food or she
			will locate you 😉
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
				Checkout this <a
					href="https://github.com/shakyapeiris/Feed-The-Snake"
					class="underline">Repository</a
				>
			</p></FaqItem
		>
		<FaqItem question="Who developed this?"
			><p slot="answer">
				Hi I'm Shakya Peiris. I'm currently studying at Ananda College,
				Colombo 10
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
