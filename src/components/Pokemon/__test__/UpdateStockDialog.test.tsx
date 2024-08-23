import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import UpdateStockDialog from '../UpdateStockDialog';
import dialogStore from 'src/stores/dialog.store';

const TestQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

beforeEach(() => {
  dialogStore.getState().toggle('isUpdateStokDialogOpen', true);
  render(<UpdateStockDialog />, { wrapper: TestQueryProvider });
});

test('should display updated pcs value in result', () => {
  const pcsInput = screen.getByTestId('pcs-input') as HTMLInputElement;
  expect(pcsInput).toBeInTheDocument();

  fireEvent.change(pcsInput, { target: { value: '10' } });
  const pcsResult = screen.getByTestId('pcs-result').textContent;

  expect(pcsResult).toEqual('10');
});

test('should display calculated doz result based on input', () => {
  const dozInput = screen.getByTestId('doz-input') as HTMLInputElement;
  expect(dozInput).toBeInTheDocument();

  fireEvent.change(dozInput, { target: { value: '2' } });
  const dozResult = screen.getByTestId('doz-result').textContent;
  const dozValue = parseInt(dozInput.value);
  const result = dozValue * 12;

  expect(dozResult).toEqual(result.toString());
});

test('should correctly calculate and display total stock', () => {
  const pcsInput = screen.getByTestId('pcs-input') as HTMLInputElement;
  const dozInput = screen.getByTestId('doz-input') as HTMLInputElement;
  expect(pcsInput).toBeInTheDocument();
  expect(dozInput).toBeInTheDocument();

  fireEvent.change(pcsInput, { target: { value: '10' } });
  fireEvent.change(dozInput, { target: { value: '2' } });

  const pcsValue = parseInt(pcsInput.value);
  const dozValue = parseInt(dozInput.value) * 12;

  const totalStock = pcsValue + dozValue;
  const totalStockEl = screen.getByTestId('total-stock');
  expect(totalStockEl).toHaveTextContent(totalStock.toString());
});
