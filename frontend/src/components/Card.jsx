const Card = ({ value, naipe }) => {
    const naipes = {
        Spades: "♠️",
        Hearts: "♥️",
        Diamonds: "♦️",
        Clubs: "♣️"
    };

    const icon = naipes[naipe] || "";

    return (
        <div className={`${naipe === "Hearts" || naipe === "Diamonds" ? "bg-red-800" : 'bg-gray-800'} border bg-gray-700 w-20 h-28 flex flex-col p-2 justify-around items-center rounded-md shadow-md`}>

            <p className={`text-2xl text-white font-bold text-center `}>
                {value}
            </p>

            <p className={`text-7xl text-white `}>
                {icon}
            </p>

        </div>
    );
}

export default Card;
