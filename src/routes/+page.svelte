<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let pokemons = data.pokemon_v2_pokemon;
</script>

{#each pokemons as pokemon}
	<div
		class="bg-gray-700 container mx-auto md:shadow-md md:w-1/3 flex align-middle flex-col p-3 mt-3 border-2 rounded-md border-gray-600"
	>
		<h1 class="uppercase font-medium">
			<span class="text-gray-400 mr-3">#{pokemon.id.toString().padStart(4, '0')}</span
			>{pokemon.name}
		</h1>
		<div class="flex flex-row mt-6 justify-around">
			{#each pokemon.pokemon_v2_pokemonsprites as sprites, index}
				<img
					src={JSON.parse(sprites.sprites)['front_default']}
					alt="{pokemon.name} Sprite"
					class="pokemon-sprite aspect-auto w-48 h-48"
				/>
			{/each}
			<div class="flex-col my-auto">
				{#each pokemon.pokemon_v2_pokemonstats as stat}
					<div class="font-medium">
						<span class="font-medium inline-block mr-6 uppercase"
							>{stat.pokemon_v2_stat.name.replace('-', ' ')}</span
						>
						{stat.base_stat}
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-row space-x-3 mt-3 items-center">
			{#each pokemon.pokemon_v2_pokemontypes as types}
				<div class="flex">
					<div
						class="pokemon-type rounded-md py-1 shadow-md border-2 border-green-500 bg-green-700"
					>
						<div class="px-3 text-center font-medium text-sm">
							{types.pokemon_v2_type.name.charAt(0).toUpperCase() +
								types.pokemon_v2_type.name.slice(1)}
						</div>
					</div>
				</div>
			{/each}
			<a href="/" class="mr-3 hover:text-gray-300">Details</a>
		</div>
	</div>
{/each}

<style>
	.pokemon-sprite {
		image-rendering: pixelated;
	}
</style>
