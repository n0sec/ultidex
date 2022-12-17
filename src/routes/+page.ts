import type { PageLoad } from './$types';
export const prerender = true;

export const load = (async ({ fetch }) => {
	// Fetch epages of pokemon
	// Response contains `name` and `url`
	// From the home page example -- https://pokeapi.co/
	const limit: number = 5;
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
	const data = await res.json();

	let promises: Array<Promise<Response>> = [];
	promises = data.results.map(async (pokemon: { url: RequestInfo | URL }) => {
		promises.push(fetch(pokemon.url).then((resp) => resp.json()));
		return await Promise.all(promises);
	});

	// return the json
	// return await res.json();
}) satisfies PageLoad;
