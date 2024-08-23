import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Pokemons from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const TestQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe('Pokemons Component', () => {
  test('should display Pokémon names that match the search term', async () => {
    render(<Pokemons />, { wrapper: TestQueryProvider });

    // Locate the search input field and type in the search term
    const searchInput = screen.getByTestId('search-pokemon');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });

    // Wait for the list of Pokémon names to update and verify that 'pikachu' is among them
    await waitFor(() => {
      const pokemonNameCells = screen.getAllByTestId('pokemon-name-cell');
      const isPikachuVisible = pokemonNameCells.some((cell) =>
        cell.textContent?.toLowerCase().includes('pikachu')
      );
      expect(isPikachuVisible).toBe(true);
    });
  });
});
