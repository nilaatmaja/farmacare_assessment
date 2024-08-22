import { create } from 'zustand';

export type Props = {
  data: {
    [key: string]: boolean;
  };
  toggle: (name: string, payload: boolean) => void;
};

const dialogStore = create<Props>((set) => ({
  data: {},
  toggle: (name, payload) =>
    set((state) => ({ data: { ...state.data, [name]: payload } }))
}));

export default dialogStore;
