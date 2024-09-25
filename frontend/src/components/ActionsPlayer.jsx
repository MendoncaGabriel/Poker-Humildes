import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalProvider";

const ActionsPlayer = () => {
  const { global } = useContext(GlobalContext);

  return (
    <>
      {global.turnPlayer && (
        <div className="mt-6 flex justify-center border">

          <h2>AÇÕES</h2>
          <div className="border-2 flex p-2 w-full justify-between">
            <button className="px-4 py-2 border rounded-md bg-green-500 font-bold text-white">bet</button>
            <button className="px-4 py-2 border rounded-md bg-blue-500 font-bold text-white">call</button>
            <button className="px-4 py-2 border rounded-md bg-purple-500 font-bold text-white">raise</button>
            <button className="px-4 py-2 border rounded-md bg-red-500 font-bold text-white">fold</button>
            <button className="px-4 py-2 border rounded-md bg-gray-500 font-bold text-white">check</button>
            <button className="px-4 py-2 border rounded-md bg-yellow-500 font-bold text-white">all in</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionsPlayer;
