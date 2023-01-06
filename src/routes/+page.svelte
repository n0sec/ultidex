<script lang="ts">
	import { goto } from '$app/navigation';
	import { debounce, last } from 'lodash-es';
	import PaginationBack from '$lib/components/PaginationBack.svelte';
	import PaginationFirst from '$lib/components/PaginationFirst.svelte';
	import PaginationLast from '$lib/components/PaginationLast.svelte';
	import PaginationNext from '$lib/components/PaginationNext.svelte';
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const updateSearch = debounce((search: string) => {
		goto(`?search=${search}`, { keepFocus: true });
	}, 300);
	const handleInput = (event) => {
		updateSearch(event.target.value);
	};

	let lastPage: number;

	$: {
		data.pokemons;
		data.pageNumber;
		if (data.search) {
			lastPage = Math.ceil(data.searchedLength / data.PAGE_SIZE);
		} else {
			lastPage = Math.ceil(data.totalPokemon / 20);
		}
	}
</script>

<div class="container mx-auto md:w-2/5 mb-6">
	<div class="relative">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				aria-hidden="true"
				class="w-5 h-5 text-gray-500 dark:text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</div>
		<form method="GET">
			<input
				type="search"
				id="default-search"
				value={$page.url.searchParams.get('search') || ''}
				class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
				placeholder="Search by name"
				on:input={handleInput}
			/>
		</form>
	</div>
	<hr class="my-3 h-px bg-gray-200 border-0 dark:bg-gray-700" />

	<!-- * Pagination Controls * -->
	<div class="grid grid-cols-[1fr_max-content_1fr] grid-rows-1 mt-6 items-center">
		<div class="col-start-1 row-start-1 space-x-3">
			{#if data.pageNumber > 1}
				<PaginationFirst {data} />
				<PaginationBack {data} />
			{/if}
		</div>
		<div class="col-start-2">{data.pageNumber} / {lastPage}</div>
		<div class="justify-self-end space-x-3">
			<PaginationNext {data} />
			<PaginationLast {data} />
		</div>
	</div>
</div>

{#each data.pokemons as pokemon}
	<div
		class="pokemon-tile bg-gray-700 container md:mx-auto md:shadow-md md:w-2/5 flex align-middle flex-col p-3 mt-3 border-2 rounded-md border-gray-600"
	>
		<h1 class="uppercase font-semibold">
			<span class="text-gray-400 mr-3">#{pokemon.id.toString().padStart(4, '0')}</span
			>{pokemon.name}
		</h1>
		<div class="flex flex-row mt-6">
			<img
				src={pokemon.sprites}
				alt="{pokemon.name} Sprite"
				class="pokemon-sprite aspect-auto w-48 h-48"
			/>
			<div class="flex-col my-auto w-full">
				{#each pokemon.stats as stat}
					<PokemonStat
						statName={stat.stat.name}
						baseStat={stat.base_stat}
						statTotal={pokemon.statTotal}
					/>
				{/each}
				<div class="font-bold pl-4 pt-5">
					Total: {pokemon.statTotal}
				</div>
			</div>
		</div>
		<div class="flex flex-row mt-3 items-center justify-between">
			<div class="flex space-x-3">
				{#each pokemon.types as types}
					<PokemonType pokemonType={types.type.name} />
				{/each}
			</div>
			<!-- TODO: Add this in when routes are done -->
			<a href="/" class="mr-3 hover:text-gray-300">Details</a>
		</div>
	</div>
{/each}
<div class="container mx-auto md:w-2/5 mb-6">
	<!-- * Pagination Controls * -->
	<div class="grid grid-cols-[1fr_max-content_1fr] grid-rows-1 mt-6 items-center">
		<div class="col-start-1 row-start-1 space-x-3">
			{#if data.pageNumber > 1}
				<PaginationFirst {data} />
				<PaginationBack {data} />
			{/if}
		</div>
		<div class="col-start-2">{data.pageNumber} / {lastPage}</div>
		<div class="justify-self-end space-x-3">
			<PaginationNext {data} />
			<PaginationLast {data} />
		</div>
	</div>
</div>

<style>
	.pokemon-sprite {
		image-rendering: pixelated;
	}

	.pokemon-tile:last-child {
		@apply mb-3;
	}
</style>
