import { useConverterStore } from '../../store/store';

const Converted = () => {
  const { convertedAmount } = useConverterStore();
  return (
    <div className="flex flex-col gap-16">
      <span className="text-center text-white">Converted Amount</span>
      <div className="w-full h-auto text-center text-4xl fontColorLight overflow-hidden break-words">
        {convertedAmount ? convertedAmount : 0}
      </div>
    </div>
  );
};

export default Converted;
