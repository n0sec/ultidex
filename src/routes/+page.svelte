<script lang="ts">
	import { browser } from '$app/environment';
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';

	export let data: PageData;
	let pokemons = data.pokemonData;
	let statTotal: number = 0;

	// // Loop over the array of pokemon
	// pokemons.forEach((pokemon) => {
	// 	// Loop over the `stats` array
	// 	for (let stat of pokemon.stats) {
	// 		// Add the base_stat to the statTotal
	// 		statTotal = statTotal + stat.base_stat;
	// 	}
	// 	// Generate a new pokemons array with the new statTotal key
	// 	pokemons.map((v) => ({ ...v, statTotal }));
	// });

	console.log(pokemons);

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

	// Define result before in global scope
	let result: Fuse.FuseResult<any>[];

	const doSearch = (searchInput: string) => {
		window.history.replaceState(null, '', `?q=${searchInput}`);
		pokemons = fuse.search(searchInput).map((pokemon) => pokemon.item);
		console.log(result);
	};

	$: if (searchInput === '') {
		pokemons = data.pokemonData;
	} else {
		pokemons;
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
</div>

{#each pokemons as pokemon}
	<div
		class="bg-gray-700 container md:mx-auto md:shadow-md md:w-2/5 flex align-middle flex-col p-3 mt-3 border-2 rounded-md border-gray-600"
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
					<PokemonStat statName={stat.stat.name} baseStat={stat.base_stat} bind:statTotal />
				{/each}
				<div class="font-bold pl-4 pt-5">
					Total: {statTotal}
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

<style>
	.pokemon-sprite {
		image-rendering: pixelated;
	}
</style>
