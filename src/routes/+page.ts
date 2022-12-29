import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
	const data = await response.json();

	const pokemonData = await Promise.all(
		data.results.map((result: { url: RequestInfo | URL }) =>
			fetch(result.url).then((response) => response.json())
		)
	);
	return {
		pokemonData
	};
}) satisfies PageLoad;
