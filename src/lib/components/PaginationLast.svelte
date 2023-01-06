<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import PaginationLastIcon from './PaginationLastIcon.svelte';

	export let data: PageData;
	export let searchMaxPages: string | number;
</script>

{#if !data.search}
	<div class="inline-grid items-center align-middle">
		<a
			href="/?page={data.maxPages}"
			class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-600 ring-offset-1 shadow-inner px-4 py-2.5 rounded-md text-sm"
			on:click><PaginationLastIcon class="w-5 h-5 text-center" /></a
		>
	</div>
{:else}
	<div class="inline-grid items-center align-middle">
		<a
			href="/?page={searchMaxPages}&search={data.search}"
			class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-600 ring-offset-1 shadow-inner px-4 py-2.5 rounded-md text-sm"
			on:click><PaginationLastIcon class="w-5 h-5 text-center" /></a
		>
	</div>
{/if}
