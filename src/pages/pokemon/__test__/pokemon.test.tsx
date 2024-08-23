import { render, screen, waitFor } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pokemon from '..';

const TestQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter initialEntries={['/pokemons/pikachu']}>
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);

const mockPokemonData = [
  {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    stock: 20,
    stockHistory: [
      {
        createdAt: new Date().toUTCString(),
        stockBeforeUpdate: 0,
        stockAfterUpdate: 5
      },
      {
        createdAt: new Date().toUTCString(),
        stockBeforeUpdate: 5,
        stockAfterUpdate: 14
      },
      {
        createdAt: new Date().toUTCString(),
        stockBeforeUpdate: 14,
        stockAfterUpdate: 20
      }
    ]
  }
];

test('render pokemon detail screen', async () => {
  localStorage.setItem('pokemonsData', JSON.stringify(mockPokemonData));

  render(
    <Routes>
      <Route path="/pokemons/:slug" element={<Pokemon />} />
    </Routes>,
    { wrapper: TestQueryProvider }
  );

  await waitFor(() => {
    const selectedPokemon = mockPokemonData.find((o) => o.name === 'pikachu');

    if (!selectedPokemon) {
      throw new Error('Selected Pokémon not found in mock data');
    }

    const pokemonName = screen.getByTestId('pokemon-name').textContent;
    const pokemonStock = screen.getByTestId('pokemon-stock');
    const pokemonStokHistoryRow = screen.getAllByTestId(
      'pokemon-stock-history-row'
    );

    expect(pokemonName).toEqual(selectedPokemon.name);
    expect(pokemonStock).toHaveTextContent('20');
    expect(pokemonStokHistoryRow).toHaveLength(
      selectedPokemon.stockHistory.length
    );

    // check if jmlh cells are disparity between stock before and stock after
    selectedPokemon.stockHistory.forEach((stockHistory, index) => {
      const pokemonJmlhCell = screen.getByTestId(
        `pokemon-stock-jmlh-${index}`
      ).textContent;
      const jmlh = `${
        stockHistory.stockAfterUpdate - stockHistory.stockBeforeUpdate === 0
          ? ''
          : '+'
      }${Math.abs(
        stockHistory.stockAfterUpdate - stockHistory.stockBeforeUpdate
      )}`;
      expect(pokemonJmlhCell === jmlh.toString());
    });
  });
});
