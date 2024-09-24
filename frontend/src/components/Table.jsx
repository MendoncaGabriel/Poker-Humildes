import Card from "./Card";

const Table = ({ players = [], flop = [], turn, river, pot = 0 }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-full w-full h-96 flex items-center justify-center shadow-2xl">

      {/* Cartas na Mesa */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
        {flop.map((card, index) => (
          <Card
            key={index}
            value={card?.value || ''}
            naipe={card?.naipe || ''}
          />
        ))}
        {turn && (
          <Card
            value={turn?.value || ''}
            naipe={turn?.naipe || ''}
          />
        )}
        {river && (
          <Card
            value={river?.value || ''}
            naipe={river?.naipe || ''}
          />
        )}
      </div>

      {/* Área do Pote */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
        ${pot}
      </div>

      {/* Jogadores ao redor da mesa */}
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`absolute flex flex-col items-center space-y-2 ${index === 0 ? 'bottom-6' : ''}`}
          style={{
            transform: `rotate(${(360 / players.length) * index}deg) translate(160px) rotate(-${(360 / players.length) * index}deg)`
          }}
        >
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {player.name[0]}
          </div>
          <div className="flex space-x-2">
            {player.cards?.length > 0 && (
              <>
                <Card
                  value={player.cards[0]?.value || ''}
                  naipe={player.cards[0]?.naipe || ''}
                  className="bg-gray-700 p-1 rounded-md shadow"
                />
                <Card
                  value={player.cards[1]?.value || ''}
                  naipe={player.cards[1]?.naipe || ''}
                  className="bg-gray-700 p-1 rounded-md shadow"
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
