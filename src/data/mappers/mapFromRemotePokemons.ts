import { Pokemon } from "@/models/Pokemon";

import { PokemonResponse } from "@/data/entities/Pokemon";

export function mapFromReomtePokemons(pokemon: PokemonResponse): Pokemon[] {
  return (
    pokemon.data?.pokemon_v2_pokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other?.["official-artwork"]
          .front_default || "",
    })) || []
  );
}
