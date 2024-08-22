import { Skeleton } from './Skeleton';
import { TableBody, TableCell, TableRow } from './Table';

export default function SkeletonTable({ row = 3, col = 4 }) {
  const cols = Array.from({ length: col }, (_, index) => index + 1);
  const rows = Array.from({ length: row }, (_, index) => index + 1);

  return (
    <TableBody>
      {rows.map((item) => (
        <TableRow key={item}>
          {cols.map((item) => (
            <TableCell key={item} className="font-medium">
              <Skeleton className="w-full h-[20px] rounded-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
