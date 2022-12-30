<script lang="ts">
	import { browser } from '$app/environment';
	import PaginationBack from '$lib/components/PaginationBack.svelte';
	import PaginationFirst from '$lib/components/PaginationFirst.svelte';
	import PaginationLast from '$lib/components/PaginationLast.svelte';
	import PaginationNext from '$lib/components/PaginationNext.svelte';
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';

	export let data: PageData;
	let pokemons = data.pokemonData;

	// Initialize the search input
	let searchInput: string = '';

	// Define Fuse Options
	// Lower threshold to prevent odd matches like Blastoise matching on "Bulbasaur"
	const fuseOptions = {
		isCaseSensitive: false,
		threshold: 0.45,
		keys: ['name', 'id']
	};

	// Create Fuse object
	// `data` is used as the object
	const fuse = new Fuse(pokemons as readonly any[], fuseOptions);

	const doSearch = (searchInput: string) => {
		window.history.replaceState(null, '', `?q=${searchInput}`);
		pokemons = fuse.search(searchInput).map((pokemon) => pokemon.item);
	};

	let currentPage: number;
	let lastPage: number;

	$: if (searchInput === '') {
		pokemons = data.pokemonData;
		// If there's nothing in the search, it's just the length of the current array / 20 (our limit)
		// Also, the last page would just be the total number of pokemon (data.data.count) / 20
		currentPage = Math.floor(pokemons.length / 20);
		lastPage = Math.floor(data.data.count / 20);
	} else {
		pokemons;
		currentPage;
		lastPage = Math.ceil(pokemons.length / 20);
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
		<input
			type="search"
			id="default-search"
			bind:value={searchInput}
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
			placeholder="Search by name"
			on:input={() => doSearch(searchInput)}
		/>
	</div>
	<hr class="my-3 h-px bg-gray-200 border-0 dark:bg-gray-700" />

	<!-- * Pagination Controls * -->
	<div class="flex flex-row mt-6 justify-between align-middle items-center">
		<div class="flex space-x-3 align-middle">
			<PaginationFirst {data} />
			<PaginationBack {data} />
		</div>
		<!-- ! Get total number of pages -->
		<div class="flex font-bold">{currentPage} / {lastPage}</div>
		<div class="flex space-x-3">
			<PaginationNext {data} />
			<PaginationLast {data} />
		</div>
	</div>
</div>

{#each pokemons as pokemon}
	<div
		class="pokemon-tile bg-gray-700 container md:mx-auto md:shadow-md md:w-2/5 flex align-middle flex-col p-3 mt-3 border-2 rounded-md border-gray-600"
	>
		<h1 class="uppercase font-semibold">
			<span class="text-gray-400 mr-3">#{pokemon.id.toString().padStart(4, '0')}</span
			>{pokemon.name}
		</h1>
		<div class="flex flex-row mt-6">
			<img
				src={pokemon.sprites.front_default}
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
	<div class="flex flex-row mt-6 justify-between items-center">
		<div class="flex space-x-3">
			<PaginationFirst {data} />
			<PaginationBack {data} />
		</div>
		<!-- ! Get total number of pages -->
		<div class="flex font-bold">{currentPage} / {lastPage}</div>
		<div class="flex space-x-3">
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
