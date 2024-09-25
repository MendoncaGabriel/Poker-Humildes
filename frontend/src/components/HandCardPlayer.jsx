import Card from "./Card"

const HandCardPlayer = ({cards}) => (
    <div className="flex space-x-2 absolute -bottom-10 transform -translate-y-1/-2">
    {cards?.length > 0 && (
      <>
        <Card
          value={cards[0]?.value || ''}
          naipe={cards[0]?.naipe || ''}
          className="bg-gray-700 p-1 rounded-md shadow"
        />
        <Card
          value={cards[1]?.value || ''}
          naipe={cards[1]?.naipe || ''}
          className="bg-gray-700 p-1 rounded-md shadow"
        />
      </>
    )}
  </div>
)

export default HandCardPlayer