import { PiStarFill, PiStarLight } from 'react-icons/pi';

interface IDropDownProps {
  currencies: string[];
  title: string;
  currency: string;
  favorites: string[];
  setCurrency: (value: string) => void;
  handleFavorite: (currency: string) => void;
}
const DropDown: React.FC<IDropDownProps> = ({
  currencies,
  title,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
}) => {
  const isFavorite = (curr: any) => favorites.includes(curr);

  return (
    <div className="w-full">
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border hover:border-gray-400 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((currency) => {
            return (
              <option className="bg-indigo-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {!isFavorite(currency) ? (
            <PiStarLight color="#3682CE" />
          ) : (
            <PiStarFill color="#3682CE" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DropDown;
