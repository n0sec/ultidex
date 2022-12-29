import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2?offset=0`);
	const data = await response.json();

	let pokemonData = await Promise.all(
		data.results.map((result: { url: RequestInfo | URL }) =>
			fetch(result.url).then((response) => response.json())
		)
	);

	pokemonData = pokemonData.map((v) => {
		let statTotal: number = 0;
		for (let stat of v.stats) {
			statTotal += stat.base_stat;
		}
		return { ...v, statTotal };
	});

	return {
		pokemonData
	};
}) satisfies PageLoad;
