import { useQuery } from '@tanstack/react-query';
import { api } from '../index';
import { getFromLocalStorage } from 'src/lib/utils';
import { PokemonsProps } from 'src/types/pokemon';

export const useGetPokemons = () => {
  const fetchPokemonData = async () => {
    const response = await api('/pokemon', {
      params: { limit: -1 }
    });
    return response.data.results;
  };

  const initializePokemonData = (pokemon: PokemonsProps) => {
    const currentDate = new Date().toISOString();

    return {
      ...pokemon,
      stock: 0,
      stockHistory: [
        {
          createdAt: currentDate,
          stockBeforeUpdate: 0,
          stockAfterUpdate: 0,
          note: '',
          activity: 'Stok Awal'
        }
      ]
    };
  };

  const query = useQuery({
    queryKey: ['pokemons'],
    queryFn: async () => {
      const pokemons = await fetchPokemonData();
      const storedPokemons = getFromLocalStorage('pokemonsData') || [];

      const updatedPokemons = pokemons.map((pokemon: PokemonsProps) => {
        const existingPokemon = storedPokemons.find(
          (p: any) => p.name === pokemon.name
        );

        if (existingPokemon) {
          return existingPokemon;
        }

        const newPokemon = initializePokemonData(pokemon);
        return newPokemon;
      });

      localStorage.setItem('pokemonsData', JSON.stringify(updatedPokemons));

      return updatedPokemons;
    }
  });

  return query;
};
