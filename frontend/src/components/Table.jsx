const Table = ({ players }) => {
  return (
    <div className="flex space-x-2 overflow-auto border-2 border-red-500 rounded-md p-4 w-full my-5">
      {players.map((player) => (
        <div
          key={player.id}
          className={`rounded-full w-20 h-20 flex items-center justify-center ${['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'][Math.floor(Math.random() * 8)]}`}
        >
          <p className="text-white font-bold">{player.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Table;
