import Card from "./Card"

const CardsTable = ({ cardsTable }) => {
    const {flop, turn, river} = cardsTable

    return (
        <>
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
        </>
    )
}

export default CardsTable