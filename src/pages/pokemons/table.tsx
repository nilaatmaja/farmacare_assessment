import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkeletonTable from 'src/components/ui/Skeleton-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/Table';
import { PokemonsProps } from 'src/types/pokemon';

const ITEMS_PER_PAGE = 10;

type Props = { isLoading: boolean; searchTerm: string };

export default function PokemonsTable({ isLoading, searchTerm }: Props) {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<PokemonsProps[]>([]);
  const storedPokemons = localStorage.getItem('pokemonsData');

  useEffect(() => {
    if (storedPokemons) {
      setPokemons(JSON.parse(storedPokemons));
    }
  }, [storedPokemons]);

  const pokemonsList = useMemo(() => {
    const filteredPokemons = searchTerm
      ? pokemons.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pokemons;

    return filteredPokemons.slice(0, ITEMS_PER_PAGE);
  }, [pokemons, searchTerm]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b-[#333]">
          <TableHead className="font-bold w-[100px] px-0">Nama</TableHead>
          <TableHead className="font-bold text-right px-0">Stok</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable row={5} col={2} />
      ) : (
        <TableBody>
          {pokemonsList.length === 0 ? (
            <TableRow className="h-60">
              <TableCell colSpan={2} className="text-center">
                There is no pok&#233;mon(s)
              </TableCell>
            </TableRow>
          ) : (
            pokemonsList.map((item) => (
              <TableRow
                key={item.name}
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/pokemons/${item.name}`);
                }}>
                <TableCell
                  className="text-primary font-bold px-0 py-3 capitalize"
                  data-testid="pokemon-name-cell">
                  {item.name}
                </TableCell>
                <TableCell className="text-right font-bold px-0 py-3">
                  {item.stock} pcs
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      )}
    </Table>
  );
}
