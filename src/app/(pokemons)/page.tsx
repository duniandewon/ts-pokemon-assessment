import { PokemonsList } from "./_components/PokemonList";
import { fetchPokemons } from "./actions";

export default async function Home() {
  const pokemons = await fetchPokemons();

  return (
    <main>
      <PokemonsList data={pokemons} loadMorePokemons={fetchPokemons} />
    </main>
  );
}
