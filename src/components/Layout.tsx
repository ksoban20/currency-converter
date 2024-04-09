import Conversion from './conversion/Conversion';
import Converted from './converted/Index';

const Layout = () => {
  return (
    <div className="flex h-1/2 w-1/2 flex-row items-center justify-center ">
      <div className=" h-full bg-white w-4/6 rounded-2xl drop-shadow-lg px-12 py-12">
        <Conversion />
      </div>
      <div className=" sidePanelColor w-1/3 h-5/6 px-8 py-12 rounded-r-2xl drop-shadow-lg">
        <Converted />
      </div>
    </div>
  );
};

export default Layout;
