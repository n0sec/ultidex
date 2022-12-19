<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data.promises);
</script>

<div class="flex">
	<div
		class="pokemon-type rounded-md py-1 shadow-md border-2 border-green-500 bg-green-700 align-middle justify-center w-auto"
	>
		<div class="px-3 text-center font-medium text-sm">Grass</div>
	</div>
</div>
