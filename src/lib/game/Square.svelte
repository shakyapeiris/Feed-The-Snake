<script lang="ts">
	export let object: string | null;
</script>

<div
	class={`w-[22px] h-[22px] mr-[1px] last:mr-0  ${
		object == 'A' ? 'bg-red-500' : object == 'S' ? 'bg-green-400' : ''
	}`}
/>
