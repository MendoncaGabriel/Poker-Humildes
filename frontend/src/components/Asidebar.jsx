import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalProvider";

const Asidebar = ({ handleButtonClick }) => {
  const { global } = useContext(GlobalContext);

  return (
    <div className='bg-gray-800 p-8 rounded-lg shadow-lg text-white w-52 '>

      <button
        onClick={handleButtonClick}
        className={`px-6 py-2 mt-6 ${global.isConnected ? 'bg-red-500' : 'bg-green-500'} text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-200`}
      >
        {global.isConnected ? 'Sair da mesa' : 'Sentar na mesa'}
      </button>

      {global.timer !== 0 && <p className="text-lg font-mono text-yellow-400 mt-2">{global.timer}</p>}

      <p className="mt-4 text-lg text-gray-400">{global.statusMessage}</p>

    </div>
  )
}

export default Asidebar