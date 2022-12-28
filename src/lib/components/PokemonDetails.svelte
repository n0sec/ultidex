<script lang="ts">
	import PokemonStat from '$lib/components/PokemonStat.svelte';
	import PokemonType from '$lib/components/PokemonType.svelte';

	export let id: number;
	export let height: number;
	export let weight: number;
	export let type: Array<any>;
	export let abilities: Array<any>;
	export let stats: Array<any>;

	let ev_yield = stats.filter((stat) => stat.effort > 0);
	console.log(ev_yield);
</script>

<table class="table-auto">
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

	<tr>
		<th> EV Yield </th>
		<td>
			<div>
				<p>{ev_yield[0].effort} {ev_yield[0].pokemon_v2_stat.name.replace('-', ' ')}</p>
			</div>
		</td>
	</tr>
</table>

<style>
	p {
		@apply capitalize;
	}

	td {
		@apply p-1 flex;
	}
	th {
		@apply text-right pl-2 pr-4;
	}
</style>
