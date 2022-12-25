<script lang="ts">
	import PokemonDetails from '../../../lib/components/PokemonDetails.svelte';

	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
	let pokemonDetails = data.pokemon_v2_pokemon[0];
	let pokemonEvolution = data.pokemon_v2_evolutionchain[0];
</script>

<div style="margin: auto; width: 75%; max-width: 1000px">
	<h1 class="flex items-center justify-center" style="padding-bottom: 20px;;">
		{pokemonDetails.name}
	</h1>
	<div class="flex items-center justify-center">
		<div class="flex">
			<div style="padding-right: 20px;">
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
			/>
		</div>
	</div>
	<container class="flex items-center justify-center" style="padding-top: 40px;">
		<div style="max-width: fit-content;">
			{#each pokemonDetails.pokemon_v2_pokemonstats as stat}
				<PokemonStat
					statName={stat.pokemon_v2_stat.name}
					baseStat={stat.base_stat}
					bind:statTotal={pokemonDetails.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
				/>
			{/each}
		</div>
	</container>
	<div class="flex items-center justify-center font-bold pl-4 pt-5" style="padding-top: 20px;">
		Total: {pokemonDetails.pokemon_v2_pokemonstats_aggregate.aggregate.sum.base_stat}
	</div>

	<div class="grow" style="">
		<h1>Evoltion Chart</h1>
		<div class="flex flex-row items-center justify-center font-bold pl-4 pt-5">
			{#each pokemonEvolution.pokemon_v2_pokemonspecies as evolutions}
				<div class="flex grow flex-col items-center justify-center" style="padding: 20px;">
					<p style="text-transform: capitalize; padding-bottom: 25px;">{evolutions.name}</p>
					{#each evolutions.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites as evoSprite}
						<img
							src={JSON.parse(evoSprite.sprites)['front_default']}
							alt={pokemonDetails.name}
							class="pokemon-sprite aspect-auto w-48 h-48"
						/>
						<div class="flex space-x-3" style="padding-top: 35px;">
							{#each evolutions.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes as evoTypes}
								<PokemonType pokemonType={evoTypes.pokemon_v2_type.name} />
							{/each}
						</div>
					{/each}
				</div>
				<p>Line</p>
			{/each}
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 2em;
		text-transform: capitalize;
		padding: 10px;
	}
	.pokemon-sprite {
		image-rendering: pixelated;
	}
	img {
		transform: scale(1.5);
		max-height: 300px;
	}
</style>
