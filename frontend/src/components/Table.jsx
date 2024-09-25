import CardsTable from "./CardsTable";
import Chairs from "./Chairs";
import Pot from "./Pot";
import HandCardPlayer from "./HandCardPlayer";
import { GlobalContext } from "../providers/GlobalProvider"
import { useContext } from "react";

const Table = () => {
  const { global } = useContext(GlobalContext);

  return (
    <div className="relative aspect-[21/9] border-8 border-gray-900  bg-gradient-to-br from-green-950 to-green-950  backdrop-brightness-150 rounded-full w-full  flex items-center justify-center shadow-2xl">
      
      <div className="border-2 border-gray-400  relative  rounded-full w-[95%] h-[90%] flex items-center justify-center shadow-2xl">
        <CardsTable cardsTable={global.cardsTable} />
        <Pot value={global.pot} />
        <Chairs players={global.chairs} />
      </div>

      <HandCardPlayer />
    </div>
  );
};

export default Table;
