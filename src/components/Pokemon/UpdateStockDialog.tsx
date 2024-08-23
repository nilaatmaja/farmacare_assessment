import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '../ui/Dialog';
import dialogStore from 'src/stores/dialog.store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/Table';
import { Input } from '../ui/Input';
import { useState, useMemo } from 'react';
import { cn, handleNumericInput } from 'src/lib/utils';
import { Button } from '../ui/Button';
import { PokemonsProps } from 'src/types/pokemon';
import { ArrowRightIcon, Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Textarea } from '../ui/Textarea';
import useViewport from 'src/hooks/use-viewport';

const defaultValue = {
  pcs: null,
  doz: null,
  note: null
};

type Props = {
  selectedId?: string;
};

export default function UpdateStockDialog({ selectedId = '' }: Props) {
  const dialogData = dialogStore((state) => state.data);
  const toggle = dialogStore((state) => state.toggle);
  const isUpdateStokDialogOpen = dialogData['isUpdateStokDialogOpen'];
  const isConfirmStokDialogOpen = dialogData['isConfirmStokDialogOpen'];
  const [values, setValues] = useState<{
    pcs: number | null;
    doz: number | null;
    note: string | null;
  }>(defaultValue);
  const storedData = localStorage.getItem('pokemonsData');
  const { isMobile } = useViewport();

  const selectedPokemon = useMemo(() => {
    if (storedData) {
      const pokemonsList: PokemonsProps[] = JSON.parse(storedData);
      const selectedPokemon = pokemonsList.find(
        (o: PokemonsProps) => o.name === selectedId
      );
      return selectedPokemon;
    }
    return null;
  }, [storedData]);

  const totalStock = useMemo(() => {
    return (values?.pcs ?? 0) + (values?.doz ?? 0) * 12;
  }, [values]);

  const handleStockInputChange = (type: 'pcs' | 'doz', value: string) => {
    const numericValue = handleNumericInput(value, 999);
    setValues((prev) => ({
      ...prev,
      [type]: Number(numericValue)
    }));
  };

  const onSave = () => {
    if (storedData) {
      const pokemonsList: PokemonsProps[] = JSON.parse(storedData);
      const selectedPokemonIndex = pokemonsList.findIndex(
        (o: PokemonsProps) => o.name === selectedId
      );

      if (selectedPokemonIndex !== -1) {
        const selectedPokemon = pokemonsList[selectedPokemonIndex];
        selectedPokemon.stockHistory.push({
          createdAt: new Date().toISOString(),
          stockBeforeUpdate: selectedPokemon.stock,
          stockAfterUpdate: selectedPokemon.stock + totalStock,
          activity: 'Update stok',
          note: values?.note ?? ''
        });
        selectedPokemon.stock = selectedPokemon.stock + totalStock;

        pokemonsList[selectedPokemonIndex] = selectedPokemon;
        localStorage.setItem('pokemonsData', JSON.stringify(pokemonsList));
      }

      toggle('isUpdateStokDialogOpen', false);
      toggle('isConfirmStokDialogOpen', false);
    }
  };

  return (
    <>
      {/* Update stock dialog */}
      <Dialog
        open={isUpdateStokDialogOpen}
        onOpenChange={() => {
          toggle('isUpdateStokDialogOpen', !isUpdateStokDialogOpen);
        }}>
        <DialogContent className="max-w-[328px]" isCloseDisabled>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="flex flex-col items-center gap-y-3">
            <h2 className="text-center font-bold text-xl">Update stok</h2>
            <p className="text-center text-sm">
              Masukkan jumlah stok yang tersedia di rak saat ini.
            </p>

            <Table>
              <TableHeader>
                <TableRow className="border-b-[#333]">
                  <TableHead className="font-bold px-0 text-black">
                    Kemasan
                  </TableHead>
                  <TableHead className="font-bold text-center px-0 text-black">
                    Jumlah
                  </TableHead>
                  <TableHead className="font-bold text-right px-0 w-10 text-black">
                    Stok
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="text-left px-0 py-3 font-bold">
                    Pcs
                  </TableCell>
                  <TableCell className="text-center px-0 py-3 ">
                    <div className="flex items-center justify-center gap-x-3">
                      <span className="min-w-7">1 x</span>
                      <div className="max-w-12">
                        <Input
                          data-testid="pcs-input"
                          value={values?.pcs ?? ''}
                          type="number"
                          onChange={(e) =>
                            handleStockInputChange('pcs', e.target.value)
                          }
                          className="rounded-sm border-[#cccccc] p-1 text-center"
                        />
                      </div>
                      <span>=</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="text-right px-0 py-3 w-10 overflow-hidden"
                    data-testid="pcs-result">
                    {values?.pcs ?? 0}
                  </TableCell>
                </TableRow>

                <TableRow className="border-black">
                  <TableCell className="text-left px-0 py-3 font-bold">
                    Lusin
                  </TableCell>
                  <TableCell className="text-center px-0 py-3 ">
                    <div className="flex items-center justify-center gap-x-3">
                      <span className="min-w-7">12 x</span>
                      <div className="max-w-12">
                        <Input
                          data-testid="doz-input"
                          value={values?.doz ?? ''}
                          type="number"
                          onChange={(e) =>
                            handleStockInputChange('doz', e.target.value)
                          }
                          className="rounded-sm border-[#cccccc] p-1 text-center"
                        />
                      </div>
                      <span>=</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className="text-right px-0 py-3 w-10 overflow-hidden"
                    data-testid="doz-result">
                    {(values?.doz ?? 0) * 12}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-between w-full text-sm">
              <p>
                <b>Total stok</b> (dalam pcs)
              </p>
              <span data-testid="total-stock">{totalStock}</span>
            </div>
          </div>
          <div className="flex w-full justify-end gap-x-3 mt-6">
            <Button
              onClick={() => {
                toggle('isConfirmStokDialogOpen', true);
              }}>
              <h5>Simpan</h5>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setValues(defaultValue);
                toggle('isUpdateStokDialogOpen', false);
              }}>
              <h5>Batal</h5>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm dialog */}
      <Dialog
        open={isConfirmStokDialogOpen}
        onOpenChange={() => {
          toggle('isConfirmStokDialogOpen', !isConfirmStokDialogOpen);
        }}>
        <DialogContent
          className={cn(
            'h-screen w-screen max-w-none flex flex-col justify-center',
            isMobile && 'px-0 pt-0 justify-start'
          )}
          isCloseDisabled>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          {isMobile && (
            <div className="flex py-3 md:py-4 px-4 md:px-10 border border-b shadow-md items-center justify-center relative h-14">
              <Button
                onClick={() => {
                  toggle('isConfirmStokDialogOpen', false);
                }}
                variant="ghost"
                className={cn(
                  'p-0 gap-x-3 items-center text-primary hover:bg-transparent hover:text-primary',
                  isMobile && 'absolute left-4'
                )}>
                <Cross1Icon className="h-5 w-5" />
                {!isMobile && <h5>Stok Pok&#233;mon</h5>}
              </Button>

              <h5 className="font-bold">Stok Pok&#233;mon</h5>
            </div>
          )}
          <div className="container">
            <div className="space-y-6">
              <h1 className={cn('text-heading1', isMobile && 'text-2xl')}>
                Konfirmasi update stok
              </h1>
              <div className="flex flex-col">
                <span className="text-sm">Selisih</span>
                <span className="text-3xl">+{totalStock} pcs</span>
              </div>
              <div className="flex gap-x-3">
                <div className="flex flex-col flex-1">
                  <span className="text-sm">Di sistem</span>
                  <span className="text-xl">
                    {selectedPokemon?.stock ?? 0} pcs
                  </span>
                </div>
                <div className="flex items-center">
                  <ArrowRightIcon className="h-6 w-6" />{' '}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm">Hasil update stok</span>
                  <span className="text-xl">
                    {(selectedPokemon?.stock ?? 0) + totalStock} pcs
                  </span>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-b-[#333]">
                    <TableHead className="font-bold px-0 text-black w-32">
                      Keterangan
                    </TableHead>
                    <TableHead className="font-bold text-left px-0 text-black">
                      Detail
                    </TableHead>
                    <TableHead className="font-bold text-right px-0 w-[100px] text-black">
                      Jumlah
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow className="border-black">
                    <TableCell className="text-left px-0 py-3 font-bold text-primary">
                      Hasil update stok
                    </TableCell>
                    <TableCell className="text-left px-0 py-3 ">
                      {values?.pcs ?? 0} pcs, {(values?.doz ?? 0) * 12} lusin
                      (12s)
                    </TableCell>
                    <TableCell className="text-right px-0 py-3 w-10 overflow-hidden">
                      <div className="flex items-center justify-end">
                        {totalStock} pcs
                        <Button
                          variant="ghost"
                          onClick={() => {
                            toggle('isConfirmStokDialogOpen', false);
                          }}
                          className="text-primary p-2 hover:text-primary hover:bg-transparent">
                          <Pencil1Icon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex justify-between w-full text-sm">
                <p className="text-primary font-bold">
                  Total hasil stok opname
                </p>
                <span>{(selectedPokemon?.stock ?? 0) + totalStock} pcs</span>
              </div>

              <div className="space-y-3">
                <h4>Catatan</h4>
                <Textarea
                  value={values?.note ?? ''}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, note: e.target.value }));
                  }}
                />
              </div>
              <div className="flex w-full justify-end gap-x-3 mt-6">
                <Button onClick={onSave}>
                  <h5>Simpan</h5>
                </Button>
                {!isMobile && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggle('isConfirmStokDialogOpen', false);
                    }}>
                    <h5>Batal</h5>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
