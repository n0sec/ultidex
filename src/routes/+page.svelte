<script lang="ts">
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';
	import Fuse from 'fuse.js';
	import type { PageData } from './$types';
	export let data: PageData;

	let pokemons = data.pokemon_v2_pokemon;
	let searchInput: string;
	const pokemonSearchableObject = data;
	console.log(pokemons);

	function updateQueryParams() {
		window.history.replaceState(null, '', `?q=${searchInput}`);
	}

	const fuseOptions = {
		isCaseSensitive: false,
		limit: 100,
		keys: ['id', 'name', 'pokemon_v2_pokemontypes.pokemon_v2_type.name']
	};

	const fuse = new Fuse(pokemonSearchableObject as readonly any[], fuseOptions);

	$: pokemons = fuse.search(searchInput);
</script>

<div class="container md:mx-auto md:w-[35%] mb-6">
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
			placeholder="Search by name, ID or type"
			on:input={updateQueryParams}
		/>
	</div>
	<hr class="my-3 h-px bg-gray-200 border-0 dark:bg-gray-700" />
</div>

{#each pokemons as pokemon}
	<div
		class="bg-gray-700 container md:mx-auto md:shadow-md md:w-[35%] flex align-middle flex-col p-3 mt-3 border-2 rounded-md border-gray-600"
	>
		<h1 class="uppercase font-semibold">
			<span class="text-gray-400 mr-3">#{pokemon.id.toString().padStart(4, '0')}</span
			>{pokemon.name}
		</h1>
		<div class="flex flex-row mt-6">
			{#each pokemon.pokemon_v2_pokemonsprites as sprites}
				<img
					src={JSON.parse(sprites.sprites)['front_default']}
					alt="{pokemon.name} Sprite"
					class="pokemon-sprite aspect-auto w-48 h-48"
				/>
			{/each}
			<div class="flex-col my-auto w-full">
				{#each pokemon.pokemon_v2_pokemonstats as stat}
					<PokemonStat
						statName={stat.pokemon_v2_stat.name}
						baseStat={stat.base_stat}
						bind:statTotal={pokemon.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
					/>
				{/each}
				<!-- ? Can we set this equal to a variable somehow? -->
				<div class="font-bold pl-4 pt-5">
					Total: {pokemon.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
				</div>
			</div>
		</div>
		<div class="flex flex-row mt-3 items-center justify-between">
			<div class="flex space-x-3">
				{#each pokemon.pokemon_v2_pokemontypes as types}
					<PokemonType pokemonType={types.pokemon_v2_type.name} />
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
