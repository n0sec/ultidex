<script lang="ts">
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';

	export let id: number;
	export let height: number;
	export let weight: number;
	export let type;
	export let abilities;
</script>

<table>
	<tr>
		<th>
			<p>ID</p>
		</th>
		<td>
			{id}
		</td>
	</tr>
	<tr>
		<th>
			<p>Height</p>
		</th>
		<td>
			{height} m
		</td>
	</tr>

	<tr>
		<th>
			<p>Weight</p>
		</th>
		<td>
			{weight} kg
		</td>
	</tr>

	<tr>
		<th> Type </th>
		<td>
			<div class="flex flex-row mt-3 items-center justify-between">
				<div class="flex space-x-3">
					{#each type as pokemonType}
						<PokemonType pokemonType={pokemonType.pokemon_v2_type.name} />
					{/each}
				</div>
			</div>
		</td>
	</tr>

	<tr>
		<th> Abilities </th>
		<td>
			<div>
				{#each abilities as ability}
					<p>{ability.pokemon_v2_ability.name}</p>
				{/each}
			</div>
		</td>
	</tr>
</table>

<style>
	p {
		text-transform: capitalize;
	}

	td {
		padding: 5px;
		display: flex;
	}
	th {
		text-align: right;
		padding-left: 10px;
		padding-right: 15px;
	}
</style>
