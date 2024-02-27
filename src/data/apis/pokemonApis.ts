import { GQLError, GraphQLAdapter } from "@/lib/GraphQLAdapter";

import { PokemonResponse } from "../entities/Pokemon";

export interface PokemonApis {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<PokemonResponse>;
}

export function PokemonApis(graphQLAdapter = GraphQLAdapter): PokemonApis {
  const gQL = graphQLAdapter("https://beta.pokeapi.co/graphql/v1beta");

  return {
    async getPokemons(limit, offset, search = "") {
      const query = `query GetPokemons($limit: Int!, $offset: Int!, $search: String) {
            pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_iregex: $search}}) {
              id
              name
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }`;

      const variables = { limit, offset, search };

      try {
        const response = await gQL<PokemonResponse, typeof variables>(
          query,
          variables
        );

        const hasNext =
          (response.data && response.data.pokemon_v2_pokemon.length >= limit) ||
          false;
        const nextOffset = hasNext ? offset + limit : 0;

        return {
          data: response.data,
          meta: {
            code: 200,
            message: "Ok",
          },
          pagination: { hasNext, nextOffset },
        };
      } catch (err) {
        const error = err as GQLError[];
        return {
          meta: {
            code: 500,
            message: error[0].message,
          },
          pagination: { hasNext: false, nextOffset: 0 },
        };
      }
    },
  };
}
