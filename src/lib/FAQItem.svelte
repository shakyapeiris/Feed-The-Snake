<script>
	export let question;
</script>

<div
	class="w-max max-w-full flex items-start justify-between text-md font-light mb-[5px] last:mb-0"
>
	<span class="font-bold text-md mr-[5px]">></span>
	<div class="w-full">
		<p class="font-bold">{question}</p>
		<p class="w-full text-sm"><slot name="answer" /></p>
	</div>
</div>
