import type { PageServerLoad } from './$types';
import POKEMONS from '$lib/server/pokemon_data.json';
const PAGE_SIZE = 20;

export const load = (async ({ url, setHeaders }) => {
	const search: string | null = url.searchParams.get('search');
	const pageNumber = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
	const offset = Number((pageNumber - 1) * 20);

	console.log(pageNumber);
	console.log(offset);

	const totalPokemon = POKEMONS.count;
	const maxPages = Math.ceil(totalPokemon / PAGE_SIZE);
	let searchedLength = 0;

	let pokemons = POKEMONS.pokemon_data;

	if (search) {
		const lowerCasedSearch = search.toLowerCase();
		pokemons = POKEMONS.pokemon_data.filter((p) =>
			p.searchTerm.toLowerCase().includes(lowerCasedSearch)
		);
		searchedLength = pokemons.length;
	}

	pokemons = pokemons.slice(offset, offset + PAGE_SIZE);

	setHeaders({
		age: '100',
		'Cache-Control': 'max-age=604800'
	});

	return {
		pokemons,
		search,
		offset,
		pageNumber,
		totalPokemon,
		maxPages,
		searchedLength,
		PAGE_SIZE
	};
}) satisfies PageServerLoad;
