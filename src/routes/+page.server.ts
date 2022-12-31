import type { PageServerLoad } from './$types';
import fs from 'fs';

export const load = (async ({ fetch, url }) => {
	let offset = Number(url.searchParams.get('offset') ?? '0');

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
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
		data,
		pokemonData,
		offset
	};
}) satisfies PageServerLoad;
