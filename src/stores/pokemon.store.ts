import { create } from 'zustand';
import { PokemonsProps } from '../types/pokemon';

type Props = {
  pokemons: PokemonsProps[];
  setPokemons: (newPokemons: PokemonsProps[]) => void;
};

export const usePokemonStore = create<Props>((set) => ({
  pokemons: [],
  setPokemons: (newPokemons) => set({ pokemons: newPokemons })
}));
