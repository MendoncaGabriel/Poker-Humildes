const PlayerTable = ({ player, positions }) => (
    <div
        className="flex flex-col items-center justify-between "
        style={{
            position: 'absolute',
            top: positions.top,
            left: positions.left,
            transform: positions.transform,
            width: '100px', // Define uma largura fixa para o container do jogador
            height: '80px', // Define uma altura fixa para o container do jogador
        }}
    >
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="ícone player"
            className="aspect-square rounded-full w-20 bg-gray-300 border-4 border-gray-800"
            style={{
                width: '70px', // Define a largura fixa para a imagem
                height: '70px', // Define a altura fixa para a imagem
                objectFit: 'cover', // Garante que a imagem se ajuste corretamente
            }}
        />
        <p className="text-gray-100 font-bold text-center">{player.name}</p>
    </div>
);

export default PlayerTable;
