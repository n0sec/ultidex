<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import PaginationFirstIcon from './PaginationFirstIcon.svelte';

	export let data: PageData;
</script>

{#if !data.search}
	<div class="inline-grid items-center align-middle">
		<a
			href="/?page=1"
			class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 hover:bg-white focus:outline-none focus:ring-1 focus:ring-slate-600 ring-offset-1 shadow-inner px-4 py-2.5 rounded-md text-sm"
			type="button"><PaginationFirstIcon class="w-5 h-5" /></a
		>
	</div>
{:else}
	<div class="inline-grid items-center align-middle">
		<a
			href="/?page=1&search={data.search}"
			class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 hover:bg-white focus:outline-none focus:ring-1 focus:ring-slate-600 ring-offset-1 shadow-inner px-4 py-2.5 rounded-md text-sm"
			type="button"><PaginationFirstIcon class="w-5 h-5" /></a
		>
	</div>
{/if}
