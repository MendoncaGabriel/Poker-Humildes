import { useContext, useEffect, useState } from "react";
import Card from "./Card"
import { GlobalContext } from "../providers/GlobalProvider";

const HandCardPlayer = () => {
  const { global } = useContext(GlobalContext);
  const [cards, setCards] = useState({})


  useEffect(() => {
    if (global.handCardPlayer) {
      setCards(global.handCardPlayer)
    }
  }, [global.handCardPlayer]);

  return (
    <div className="flex space-x-2 absolute -bottom-10 transform -translate-y-1/-2">
      {cards.fistCard && cards.secoundCard && (
        <>

          <Card
            value={cards.fistCard?.value || ''}
            naipe={cards.fistCard?.naipe || ''}
            className="bg-gray-700 p-1 rounded-md shadow"
          />
          <Card
            value={cards.secoundCard.value || ''}
            naipe={cards.secoundCard.naipe || ''}
            className="bg-gray-700 p-1 rounded-md shadow"
          />
        </>
      )}
    </div>
  )
}

export default HandCardPlayer