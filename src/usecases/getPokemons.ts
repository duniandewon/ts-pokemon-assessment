import { PokemonApis } from "@/data/apis/pokemonApis";
import { mapFromReomtePokemons } from "@/data/mappers/mapFromRemotePokemons";

import { PaginatedPokemon } from "@/models/Pokemon";

interface Data {
  limit: number;
  offset: number;
  search?: string;
}

export async function getPokemons(
  data: Data,
  pokemonApi: PokemonApis = PokemonApis()
): Promise<PaginatedPokemon> {
  try {
    const pokemons = await pokemonApi.getPokemons(
      data.limit,
      data.offset,
      data.search
    );

    return {
      pokemons: mapFromReomtePokemons(pokemons),
      pagination: {
        hasNext: pokemons.pagination.hasNext,
        nextOffset: pokemons.pagination.nextOffset,
      },
    };
  } catch (err) {
    console.log("getPokemons usecase error: ", err);
    return {
      pokemons: [],
      pagination: {
        hasNext: false,
        nextOffset: 0,
      },
    };
  }
}
