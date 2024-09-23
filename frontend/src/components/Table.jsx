import Card from "./Card";

const Table = ({ players, flop, turn, river }) => {
  return (
    <div className="flex space-x-2 overflow-auto border-2 border-red-500 rounded-md p-4 w-full my-5">
      {players.map((player) => (
        <>
          <div className='border p-4 flex justify-center space-x-4 bg-gray-50'></div>
          {flop && (
            <>
              <Card
                value={flop[0]?.value}
                naipe={flop[0]?.naipe}
              />
              <Card
                value={flop[1]?.value}
                naipe={flop[1]?.naipe}
              />
              <Card
                value={flop[2]?.value}
                naipe={flop[2]?.naipe}
              />
            </>
          )}
          {turn && (
            <Card
              value={turn?.value}
              naipe={turn?.naipe}
            />
          )}
          {river && (
            <Card
              value={river?.value}
              naipe={river?.naipe}
            />
          )}
          <div
            key={player.id}
            className={`rounded-full w-20 h-20 flex items-center justify-center ${['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'][Math.floor(Math.random() * 8)]}`}
          >
            <p className="text-white font-bold">{player.name}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Table;
