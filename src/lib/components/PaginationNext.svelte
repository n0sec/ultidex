<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import PaginationNextIcon from './PaginationNextIcon.svelte';

	export let data: PageData;
</script>

<div class="flex items-center align-middle">
	<a
		href="/?page={data.pageNumber + 1}"
		class="bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-slate-600 ring-offset-1 shadow-inner px-4 py-2.5 rounded-md text-sm"
		><PaginationNextIcon class="w-5 h-5" /></a
	>
</div>
