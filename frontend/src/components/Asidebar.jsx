const Asidebar = ({handleButtonClick, isConnected, playerId, timer, statusMessage}) => {
    return (
        <div className='bg-gray-800 p-8 rounded-lg shadow-lg text-white w-52 '>

        <button
          onClick={handleButtonClick}
          className={`px-6 py-2 mt-6 ${isConnected ? 'bg-red-500' : 'bg-green-500'} text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-200`}
        >
          {isConnected ? 'Sair da mesa' : 'Sentar na mesa 1'}
        </button>
          <p className="text-gray-300">Player ID: <span className="font-semibold">{playerId}</span></p>
          {timer !== 0 && <p className="text-lg font-mono text-yellow-400 mt-2">{timer}</p>}
          <p className="mt-4 text-lg text-gray-400">{statusMessage}</p>

      </div>
    )
}

export default Asidebar