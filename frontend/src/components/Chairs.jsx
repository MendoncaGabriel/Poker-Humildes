import PlayerTable from "./PlayerTable";

const Chairs = ({ players }) => {
  const positions = [
    { top: '0%', left: '20%', transform: 'translate(-50%, -50%)' },
    { top: '0%', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '0%', left: '80%', transform: 'translate(-50%, -50%)' },
    { top: '20%', left: '100%', transform: 'translate(-50%, -50%)' },
    { top: '80%', left: '100%', transform: 'translate(-50%, -50%)' },
    { top: '100%', left: '80%', transform: 'translate(-50%, -50%)' },
    { top: '100%', left: '20%', transform: 'translate(-50%, -50%)' },
    { top: '80%', left: '0%', transform: 'translate(-50%, -50%)' },
    { top: '20%', left: '0%', transform: 'translate(-50%, -50%)' },
  ];

  return (
    <div className="relative w-full h-full">
      {players?.slice(0, 10).map((player, index) => (
         
        <PlayerTable player={player} positions={positions[index]} key={index}/>
      ))}
    </div>
  );
};

export default Chairs;
