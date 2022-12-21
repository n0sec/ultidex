import type { PageLoad } from './$types';
import { request, gql } from 'graphql-request';
export const prerender = true;

const endPoint: string = 'https://beta.pokeapi.co/graphql/v1beta';
const query = gql`
	query getPokemonData($limit: Int) {
		pokemon_v2_pokemon(limit: $limit, offset: 0) {
			id
			name
			pokemon_v2_pokemonstats(distinct_on: id) {
				base_stat
				effort
				pokemon_v2_stat {
					name
				}
			}
			pokemon_v2_pokemontypes(distinct_on: id) {
				pokemon_v2_type {
					name
					id
				}
			}
			pokemon_v2_pokemonsprites(distinct_on: id) {
				sprites
				pokemon_id
			}
			pokemon_v2_pokemonstats_aggregate(distinct_on: id) {
				aggregate {
					sum {
						base_stat
					}
				}
			}
		}
	}
`;
const variables = {
	limit: 20
};
export const load = (async () => {
	// Uses GraphQL to request Pokemon Data
	return await request(endPoint, query, variables);
}) satisfies PageLoad;
