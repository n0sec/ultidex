<script lang="ts">
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let pokemons = data.pokemon_v2_pokemon;
	console.log(pokemons);
</script>

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
			<div class="flex space-x-3 justify-center">
				{#each pokemon.pokemon_v2_pokemontypes as types}
					<PokemonType pokemonType={types.pokemon_v2_type.name} />
				{/each}
			</div>
			<a href="/" class="mr-3 hover:text-gray-300">Details</a>
		</div>
	</div>
{/each}

<style>
	.pokemon-sprite {
		image-rendering: pixelated;
	}
</style>
