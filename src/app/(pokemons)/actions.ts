"use server";

import { getPokemons } from "@/usecases/getPokemons";

export async function fetchPokemons(offset: number = 0, search: string = "") {
  const pokemons = await getPokemons({ limit: 20, offset, search });

  return pokemons;
}
