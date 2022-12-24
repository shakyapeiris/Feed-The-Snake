<script lang="ts">
	export let object: string | null;
</script>

<div
	class="{`w-[5%] md:w-[25px] aspect-square mr-[1px] last:mr-0  ${
		object == 'A'
			? 'bg-red-500'
			: object == 'S'
			? 'bg-green-400'
			: object == 'H'
			? 'bg-blue-200'
			: ''
	}`}"
></div>
