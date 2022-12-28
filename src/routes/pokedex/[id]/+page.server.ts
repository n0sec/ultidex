import { request, gql } from 'graphql-request';
import type { PageServerLoad } from './$types';
export const prerender = true;

const endPoint: string = 'https://beta.pokeapi.co/graphql/v1beta';
const query = gql`
	query PokemonDetails {
		pokemon_v2_pokemon(where: { id: { _eq: 1 } }) {
			id
			name
			height
			base_experience
			weight
			pokemon_v2_pokemonstats {
				base_stat
				pokemon_v2_stat {
					name
				}
			}
		}
		pokemon_v2_pokemontype(distinct_on: id, limit: 2) {
			pokemon_v2_type {
				name
			}
		}
	}
`;

export const load = (async ({ params }) => {
	// Uses GraphQL to request Pokemon Data
	return await request(
		endPoint,
		`
		query PokemonDetails {
  pokemon_v2_pokemon(where: {id: {_eq: ${params.id}}}) {
    id
    name
    height
    base_experience
    weight
    pokemon_v2_pokemonstats {
      base_stat
      effort
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemonabilities(distinct_on: id) {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonsprites(distinct_on: id) {
      sprites
    }
    pokemon_v2_pokemonstats_aggregate(distinct_on: id) {
      aggregate {
        sum {
          base_stat
        }
      }
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonmoves(order_by: {level: asc}) {
      level
      pokemon_v2_move {
        name
        power
        accuracy
        pp
        pokemon_v2_generation {
          name
        }
        pokemon_v2_type {
          name
        }
        pokemon_v2_moveflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
          flavor_text
        }
      }
      pokemon_v2_versiongroup {
        generation_id
      }
      pokemon_v2_movelearnmethod {
        name
      }
    }
  }
  pokemon_v2_evolutionchain(where: {pokemon_v2_pokemonspecies: {id: {_eq: ${params.id}}}}) {
    pokemon_v2_pokemonspecies {
      name
      id
	  pokemon_v2_pokemons {
        pokemon_v2_pokemonsprites(distinct_on: id) {
          sprites
        }
		pokemon_v2_pokemontypes(distinct_on: id) {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
}`
	);
}) satisfies PageServerLoad;
