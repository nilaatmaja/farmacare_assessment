import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import UpdateStockDialog from 'src/components/Pokemon/UpdateStockDialog';
import { Button } from 'src/components/ui/Button';
import useViewport from 'src/hooks/use-viewport';
import { cn } from 'src/lib/utils';
import dialogStore from 'src/stores/dialog.store';

export default function PokemonHeader({
  selectedId = ''
}: {
  selectedId?: string;
}) {
  const navigate = useNavigate();
  const toggle = dialogStore((state) => state.toggle);
  const dialogData = dialogStore((state) => state.data);
  const isUpdateStokDialogOpen = dialogData['isUpdateStokDialogOpen'];
  const { isMobile } = useViewport();

  return (
    <>
      <div
        className={cn(
          'flex py-3 md:py-4 justify-between px-4 md:px-10',
          isMobile &&
            'border border-b shadow-md items-center justify-center relative'
        )}>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant="ghost"
          className={cn(
            'p-0 gap-x-3 items-center text-primary hover:bg-transparent hover:text-primary',
            isMobile && 'absolute left-4'
          )}>
          <ArrowLeftIcon className="h-5 w-5" />
          {!isMobile && <h5>Stok Pok&#233;mon</h5>}
        </Button>

        {isMobile && <h5 className="font-bold">Stok Pok&#233;mon</h5>}

        {!isMobile && (
          <Button
            variant="outline"
            onClick={() => toggle('isUpdateStokDialogOpen', true)}>
            <h5>Update Stok</h5>
          </Button>
        )}
      </div>

      {isUpdateStokDialogOpen && <UpdateStockDialog selectedId={selectedId} />}
    </>
  );
}
