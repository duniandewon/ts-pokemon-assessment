import Image from "next/image";

interface Props {
  pokemon: { image: string; name: string };
  isSelected: boolean;
}

export function PokemonItem({ pokemon, isSelected }: Props) {
  return (
    <div
      className={`cursor-pointer border p-2 ${
        isSelected
          ? "border-slate-300"
          : "border-transparent hover:border-slate-500"
      }`}
    >
      <Image src={pokemon.image} alt={pokemon.name} width={150} height={150} />
    </div>
  );
}
