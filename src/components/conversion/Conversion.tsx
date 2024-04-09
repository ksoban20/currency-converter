import { useEffect } from 'react';

import { useConverterStore } from '../../store/store';

import { TbArrowsDiff } from 'react-icons/tb';
import { PropagateLoader } from 'react-spinners';

import DropDown from '../shared/Select';

import { base_URL } from '../../constant/api';

const Conversion = () => {
  const {
    favorites,
    currencies,
    amount,
    fromCurrency,
    toCurrency,
    loading,
    setLoading,
    setAmount,
    setConvertedAmount,
    setFavorites,
    setFromCurrency,
    setToCurrency,
    setCurrencies,
  } = useConverterStore();

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`${base_URL}/currencies`);
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${base_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      if (setConvertedAmount) {
        setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
      }
    } catch (error) {
      console.error('Error Fetching', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (currency: string) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.indexOf(currency);
    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(currency);
    }
    if (setFavorites) {
      setFavorites(updatedFavorites);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency?.(toCurrency);
    setToCurrency?.(fromCurrency);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');
    setAmount?.(newValue);
  };

  return (
    <div className="flex flex-col gap-8">
      <span className="text-center text-3xl fontColorLight">
        Currency Converter
      </span>

      <div className="flex flex-row gap-x-8 w-full justify-center items-center">
        <DropDown
          currencies={currencies}
          title="Convert From:"
          currency={fromCurrency}
          favorites={favorites}
          handleFavorite={handleFavorite}
          setCurrency={setFromCurrency}
        />
        <div className="flex justify-center pt-4 ">
          <button
            onClick={swapCurrencies}
            className="p-2 lightBgColor rounded-full cursor-pointer lightBgHover"
          >
            <TbArrowsDiff className="text-xl text-white" />
          </button>
        </div>
        <DropDown
          currencies={currencies}
          title="Convert To:"
          currency={toCurrency}
          favorites={favorites}
          handleFavorite={handleFavorite}
          setCurrency={setToCurrency}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>

        <input
          value={amount}
          onChange={onAmountChange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      <div className="flex mt-6">
        <button
          disabled={loading}
          onClick={convertCurrency}
          className={`px-5 w-full h-12 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${
            loading ||
            (!amount && 'bg-indigo-300 cursor-not-allowed hover:bg-indigo-300')
          }`}
        >
          {!loading ? (
            'Convert'
          ) : (
            <PropagateLoader className="mb-2" color="#fff" size={12} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Conversion;
