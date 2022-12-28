<script lang="ts">
	import PokemonDetails from '$lib/components/PokemonDetails.svelte';
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';

	import type { PageData } from './$types';
	import MaterialSymbolsArrowRightAltRounded from '$lib/components/MaterialSymbolsArrowRightAltRounded.svelte';
	export let data: PageData;

	console.log(data);
	let pokemonDetails = data.pokemon_v2_pokemon[0];
	let pokemonEvolution = data.pokemon_v2_evolutionchain[0];
</script>

<div class="container mx-auto md:w-2/3">
	<h1 class="flex items-center justify-center font-bold pb-5">
		{pokemonDetails.name}
	</h1>
	<div class="flex items-center justify-center">
		<div class="pr-5">
			{#each pokemonDetails.pokemon_v2_pokemonsprites as sprites}
				<img
					src={JSON.parse(sprites.sprites)['front_default']}
					alt={pokemonDetails.name}
					class="pokemon-sprite aspect-auto w-48 h-48"
				/>
			{/each}
		</div>
		<PokemonDetails
			id={pokemonDetails.id}
			height={pokemonDetails.height / 10}
			weight={pokemonDetails.weight / 10}
			abilities={pokemonDetails.pokemon_v2_pokemonabilities}
			type={pokemonDetails.pokemon_v2_pokemontypes}
			stats={pokemonDetails.pokemon_v2_pokemonstats}
		/>
	</div>
	<div class="flex items-center justify-center mt-6">
		<div>
			{#each pokemonDetails.pokemon_v2_pokemonstats as stat}
				<PokemonStat
					statName={stat.pokemon_v2_stat.name}
					baseStat={stat.base_stat}
					bind:statTotal={pokemonDetails.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
				/>
			{/each}
		</div>
	</div>
	<div class="flex items-center justify-center font-bold pl-4 pt-5">
		Total: {pokemonDetails.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
	</div>

	<h1 class="mt-6 pb-5">Evolution Chart</h1>

	<div class="flex justify-center">
		<div class="flex flex-row items-center space-x-6 w-auto">
			{#each pokemonEvolution.pokemon_v2_pokemonspecies as evolutions, i}
				<div class="flex flex-col items-center p-5">
					<h3 class="capitalize pb-6 hover:underline hover:underline-offset-4 text-xl font-medium">
						<a href={evolutions.id} data-sveltekit-reload>{evolutions.name}</a>
					</h3>
					{#each evolutions.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites as evoSprite}
						<img
							src={JSON.parse(evoSprite.sprites)['front_default']}
							alt={pokemonDetails.name}
							class="pokemon-sprite aspect-auto w-48 h-48"
						/>
						<div class="flex space-x-3 align-middle items-center pt-3">
							{#each evolutions.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes as evoTypes}
								<PokemonType pokemonType={evoTypes.pokemon_v2_type.name} />
							{/each}
						</div>
					{/each}
				</div>
				{#if pokemonEvolution.pokemon_v2_pokemonspecies.length >= i + 2}
					<MaterialSymbolsArrowRightAltRounded class="w-10 h-10" />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	h1 {
		@apply text-3xl capitalize font-bold;
	}
	.pokemon-sprite {
		image-rendering: pixelated;
	}
	img {
		transform: scale(1.1);
		/* max-height: 300px; */
	}
</style>
