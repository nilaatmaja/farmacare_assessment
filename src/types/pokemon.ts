export type PokemonsProps = {
  name: string;
  url: string;
  stock: number;
  stockHistory: StockHistoryProps[];
};

export type StockHistoryProps = {
  createdAt: string;
  stockBeforeUpdate: number;
  stockAfterUpdate: number;
  note: string;
  activity: string;
};
