const Card = ({ value, naipe }) => {
    const naipes = {
        Spades: "♠️",
        Hearts: "♥️",
        Diamonds: "♦️",
        Clubs: "♣️"
    };

    const icon = naipes[naipe] || "";

    return (
        <div className='border bg-white w-20 h-28 flex flex-col p-2 justify-around rounded-md shadow-md'>
            <p>{value}</p>
            <p className={`text-xl font-bold text-center ${naipe === "Hearts" || naipe === "Diamonds" ? "text-red-500" : ''}`}>{value}</p>
            <p className={`text-7xl ${naipe === "Hearts" || naipe === "Diamonds" ? "text-red-500" : ''}`}>{icon}</p>
        </div>
    );
}

export default Card;
