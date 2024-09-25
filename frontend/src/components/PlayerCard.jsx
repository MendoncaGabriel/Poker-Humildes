import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalProvider";


const PlayerCard = () => {
  const { global } = useContext(GlobalContext);
  if(!global.principalPlayer) return

  return (
    <div className='bg-gray-800 p-8 rounded-lg shadow-lg text-white w-52 '>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        alt="player principal"
        className="w-52 bg-gray-200"
      />

      <p className="text-gray-300 space-x-1">
        <span>
          <b>
            ID:
          </b>
        </span>
        <span>
          {global.principalPlayer.id}
        </span>
      </p>

      <p className="text-gray-300 space-x-1">
        <span>
          <b>
            Name:
          </b>
        </span>
        <span>
          {global.principalPlayer.name}
        </span>
      </p>

      <p className="text-gray-300 space-x-1">
        <span>
          <b>
            Wallet:
          </b>
        </span>
        <span>
          {global.principalPlayer.wallet}
        </span>
      </p>
    </div>
  )
}

export default PlayerCard