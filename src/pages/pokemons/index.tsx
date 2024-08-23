import { useGetPokemons } from 'src/api/queries/pokemons.query';
import { Input } from 'src/components/ui/Input';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search.svg';
import PokemonsTable from './table';
import { useState } from 'react';

export default function Pokemons() {
  const { isLoading: isLoadingPokemons } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-y-3">
        <div className="space-y-8">
          <h1 className="text-heading1">Stok Pok&#233;mon</h1>

          <Input
            data-testid="search-pokemon"
            placeholder="Cari Pok&#233;mon"
            leftIcon={<SearchIcon />}
            iconClassName={{ leftIcon: 'text-primary' }}
            className="max-w-[400px]"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <PokemonsTable searchTerm={searchTerm} isLoading={isLoadingPokemons} />
      </div>
    </div>
  );
}
