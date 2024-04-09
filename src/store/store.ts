import create from 'zustand';

interface IStoreProps {
  currencies: string[];
  favorites: string[];
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  loading: boolean;
  convertedAmount: string | null;
  setCurrencies: (currencies: string[]) => void;
  setAmount?: (amount: string) => void;
  setFromCurrency?: (currency: string) => void;
  setToCurrency?: (currency: string) => void;
  setConvertedAmount?: (convertedAmount: string | null) => void;
  setFavorites?: (favorites: string[]) => void;
  setLoading: (loading: boolean) => void;
}

const storedFavorites = JSON.parse(localStorage.getItem('favorites') || 'null');

export const useConverterStore = create<IStoreProps>((set) => ({
  currencies: [],
  amount: '',
  fromCurrency: 'USD',
  toCurrency: 'INR',
  convertedAmount: null,
  favorites: Array.isArray(storedFavorites) ? storedFavorites : ['INR', 'EUR'],
  loading: false,
  setCurrencies: (currencies) => set(() => ({ currencies })),
  setLoading: (loading) => set(() => ({ loading })),
  setAmount: (amount) => set(() => ({ amount })),
  setFromCurrency: (fromCurrency) => set(() => ({ fromCurrency })),
  setToCurrency: (toCurrency) => set(() => ({ toCurrency })),
  setFavorites: (favorites) => set(() => ({ favorites })),
  setConvertedAmount: (convertedAmount) => set(() => ({ convertedAmount })),
}));
