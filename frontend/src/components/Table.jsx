import CardsTable from "./CardsTable";
import Chairs from "./Chairs";
import Pot from "./Pot";
import HandCardPlayer from "./HandCardPlayer";

const Table = ({ players = [], cardsTable, pot = 0 }) => {

  const cardsMok = [
    { value: 7, naipe: "Diamonds" },
    { value: 6, naipe: "Spades" }
  ]

  return (
    <div className="relative aspect-[21/9] border-8 border-gray-900  bg-gradient-to-br from-green-950 to-green-950  backdrop-brightness-150 rounded-full w-full  flex items-center justify-center shadow-2xl">
      <div className="border-2 border-gray-400  relative  rounded-full w-[95%] h-[90%] flex items-center justify-center shadow-2xl">

        <CardsTable cardsTable={cardsTable} />

        <Pot value={pot} />

        <Chairs players={players} />

      </div>

      <HandCardPlayer cards={cardsMok} />
    </div>
  );
};

export default Table;
