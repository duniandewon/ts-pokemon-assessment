"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PaginatedPokemon } from "@/models/Pokemon";

import { PokemonItem } from "./PokemonItem";

interface Props {
  data: PaginatedPokemon;
  loadMorePokemons: (offset: number) => Promise<PaginatedPokemon>;
}

export function PokemonsList({ data, loadMorePokemons }: Props) {
  const [pokemons, setPokemons] = useState(data.pokemons);
  const [nextOffset, setNextOffset] = useState(data.pagination.nextOffset);

  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  const lastPokemon = useRef<HTMLLIElement>(null);

  const onSelectPokemon = (id: number) => {
    setSelectedPokemon(id);
  };

  const handleLoadMorePokemon = useCallback(async () => {
    const data = await loadMorePokemons(nextOffset);

    if (data.pokemons) {
      setPokemons((prev) => [...prev, ...data.pokemons]);
      setNextOffset(data.pagination.nextOffset);
    }
  }, [loadMorePokemons, nextOffset]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) handleLoadMorePokemon();
    });

    if (lastPokemon.current) observer.observe(lastPokemon.current);

    return () => observer.disconnect();
  }, [handleLoadMorePokemon]);

  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
      {useMemo(
        () =>
          pokemons.map((pokemon, i, prevPokemons) => (
            <li
              key={pokemon.id}
              ref={i === prevPokemons.length - 1 ? lastPokemon : null}
              onClick={() => onSelectPokemon(pokemon.id)}
            >
              <PokemonItem
                pokemon={pokemon}
                isSelected={selectedPokemon === pokemon.id}
              />
            </li>
          )),
        [pokemons, selectedPokemon]
      )}
    </ul>
  );
}
