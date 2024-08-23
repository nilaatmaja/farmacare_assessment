import moment from 'moment';
import SkeletonTable from 'src/components/ui/Skeleton-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'src/components/ui/Table';
import useViewport from 'src/hooks/use-viewport';
import { cn } from 'src/lib/utils';
import { PokemonsProps } from 'src/types/pokemon';

type Props = { isLoading: boolean; data?: PokemonsProps['stockHistory'] };

export default function PokemonHistoryTable({ isLoading, data = [] }: Props) {
  const { isMobile } = useViewport();
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl">Riwayat Stok</h3>
        <p className="text-sm">Satuan stok dalam pcs</p>
      </div>
      {isMobile ? (
        <>
          {[...data].reverse().map((item, index) => (
            <Table key={`riwayat-m-${index}`}>
              <TableHeader>
                <TableRow className="border-b-[#333]">
                  <TableHead className="font-bold text-black w-[200px] px-0">
                    {moment(item.createdAt).format('DD MMM YYYY')}
                  </TableHead>
                  <TableHead className="font-bold text-black text-right w-[80px] px-0">
                    Jmlh
                  </TableHead>
                  <TableHead className="font-bold text-black text-center w-[80px] px-0">
                    Stok
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="text-left px-0 py-3 capitalize">
                    <p>{moment(item.createdAt).format('HH:mm')}</p>
                    <p className="text-sm text-primary font-bold">
                      {item.activity}
                    </p>
                    <p className="text-xs">{item.note}</p>
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right px-0 py-3',
                      item.stockAfterUpdate - item.stockBeforeUpdate > 0 &&
                        'text-[#219653]'
                    )}>
                    {item.stockAfterUpdate - item.stockBeforeUpdate === 0
                      ? ''
                      : '+'}
                    {Math.abs(item.stockAfterUpdate - item.stockBeforeUpdate)}
                  </TableCell>
                  <TableCell className="text-center px-0 py-3">
                    {item.stockAfterUpdate}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b-[#333]">
              <TableHead className="font-bold text-black w-[200px] px-0">
                Waktu
              </TableHead>
              <TableHead className="font-bold text-black w-[200px] left px-0">
                Kegiatan
              </TableHead>
              <TableHead className="font-bold text-black text-left px-0">
                Catatan
              </TableHead>
              <TableHead className="font-bold text-black text-right w-[80px] px-0">
                Jmlh
              </TableHead>
              <TableHead className="font-bold text-black text-center w-[80px] px-0">
                Stok
              </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <SkeletonTable row={5} col={2} />
          ) : (
            <TableBody>
              {data.length === 0 ? (
                <TableRow className="h-60">
                  <TableCell colSpan={2} className="text-center">
                    There is no Riwayat
                  </TableCell>
                </TableRow>
              ) : (
                [...data].reverse().map((item, index) => (
                  <TableRow
                    key={`riwayat-${index}`}
                    data-testid="pokemon-stock-history-row">
                    <TableCell className="text-left px-0 py-3 capitalize">
                      {moment(item.createdAt).format('DD MMM YYYY, HH:mm')}
                    </TableCell>
                    <TableCell className="text-left font-bold px-0 py-3 text-primary">
                      {item.activity}
                    </TableCell>
                    <TableCell className="text-left px-0 py-3">
                      {item.note}
                    </TableCell>
                    <TableCell
                      data-testid={`pokemon-stock-jmlh-${index}`}
                      className={cn(
                        'text-right px-0 py-3',
                        item.stockAfterUpdate - item.stockBeforeUpdate > 0 &&
                          'text-[#219653]'
                      )}>
                      {item.stockAfterUpdate - item.stockBeforeUpdate === 0
                        ? ''
                        : '+'}
                      {Math.abs(item.stockAfterUpdate - item.stockBeforeUpdate)}
                    </TableCell>
                    <TableCell className="text-center px-0 py-3">
                      {item.stockAfterUpdate}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
}
