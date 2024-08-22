import { useParams } from 'react-router-dom';
import PokemonHeader from './header';
import PokemonHistoryTable from './table';
import { useEffect, useState } from 'react';
import { PokemonsProps } from 'src/types/pokemon';
import dialogStore from 'src/stores/dialog.store';
import useViewport from 'src/hooks/use-viewport';
import { Button } from 'src/components/ui/Button';

export default function Pokemon() {
  const { slug } = useParams();
  const [pokemon, setPokemon] = useState<PokemonsProps>();
  const storedData = localStorage.getItem('pokemonsData');
  const dialogData = dialogStore((state) => state.data);
  const isUpdateStokDialogOpen = dialogData['isUpdateStokDialogOpen'];
  const { isMobile } = useViewport();
  const toggle = dialogStore((state) => state.toggle);

  useEffect(() => {
    if (slug) {
      if (storedData) {
        const selectedPokemon = JSON.parse(storedData).find(
          (o: PokemonsProps) => o.name === slug
        );
        setPokemon(selectedPokemon);
      }
    }
  }, [slug, storedData, isUpdateStokDialogOpen]);

  return (
    <>
      <PokemonHeader selectedId={pokemon?.name} />
      <div className="p-4 md:p-10">
        <div className="space-y-6">
          <div className="space-y-6">
            <h1 className="text-heading1 capitalize">{pokemon?.name || '-'}</h1>
            {isMobile && (
              <Button
                variant="outline"
                onClick={() => toggle('isUpdateStokDialogOpen', true)}>
                <h5>Update Stok</h5>
              </Button>
            )}
            <div>
              <p className="text-sm">Sisa stok</p>
              <span className="text-[32px] leading-[40px]">
                {pokemon?.stock || 0} pcs
              </span>
            </div>
          </div>
          <PokemonHistoryTable data={pokemon?.stockHistory} isLoading={false} />
        </div>
      </div>
    </>
  );
}
