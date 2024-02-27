export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PaginatedPokemon {
  pokemons: Pokemon[];
  pagination: {
    hasNext: boolean;
    nextOffset: number;
  };
}
