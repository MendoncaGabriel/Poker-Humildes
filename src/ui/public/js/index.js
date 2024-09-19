let socket = null;
let isConnected = false;

const mesa = document.getElementById('mesa');
const btnSentarAMesa = document.getElementById('btnSentarAMesa');
const statusMessage = document.getElementById('statusMessage');

const cores = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500'
];

function corAleatoria() {
    const indice = Math.floor(Math.random() * cores.length);
    return cores[indice];
}

function showPlayersInTable(chairs) {
    mesa.innerHTML = '';
    chairs.forEach(e => {
        const cor = corAleatoria();
        mesa.innerHTML += `
        <div id="${e.id}" class="${cor} rounded-full w-20 h-20 flex items-center justify-center">
            <p class="text-white font-bold">${e.name}</p>
        </div>`;
    });
}

function actionPlayer(action, value) {
    send({
        msg: action,
        data: value
    });
}

function connectWebSocket() {
    if (isConnected) return;  // Não conectar se já estiver conectado

    // Usando Socket.IO para conectar ao servidor
    socket = io('http://localhost:3000');  // Ajustar conforme sua URL

    socket.on('connect', () => {
        isConnected = true;
        send({
            msg: 'sentar player na mesa',
            data: {
                player: {
                    id: Math.random().toString(36).substr(2, 20),
                    name: 'jhoe-due'
                },
                room: {
                    id: 'sala-1'
                }
            }
        });
    });

    socket.on('message', (mensagem) => {
        if (mensagem.msg === "exibir players da mesa") {
            showPlayersInTable(mensagem.chairs);
        }

        if (mensagem.msg === "Mesa cheia" || mensagem.msg === "Mesa fechada") {
            alert(mensagem.msg);
        }
    });

    socket.on('disconnect', () => {
        isConnected = false;
        console.log('WebSocket desconectado.');
        // Atualiza o estado da interface
        btnSentarAMesa.classList.replace("bg-orange-500", "bg-blue-500");
        btnSentarAMesa.innerText = "Sentar na mesa";
        statusMessage.textContent = 'Usuário desconectado';
        mesa.innerHTML = "";
    });

    socket.on('connect_error', (error) => {
        console.error('Erro na conexão WebSocket: ', error);
        statusMessage.textContent = 'Erro na conexão WebSocket. Tente novamente.';
    });
}

function disconnectWebSocket() {
    if (socket && isConnected) {
        socket.disconnect();  // Método certo para desconectar em Socket.IO
        isConnected = false;
        console.log('WebSocket desconectado.');
    }
}

function send(message) {
    if (isConnected) {
        socket.emit('message', message);  // Emissão via Socket.IO
    } else {
        console.warn('Tentativa de enviar dados enquanto o WebSocket não está conectado.');
    }
}

btnSentarAMesa.addEventListener('click', () => {
    if (!isConnected) {
        connectWebSocket();
        btnSentarAMesa.classList.replace("bg-blue-500", "bg-orange-500");
        btnSentarAMesa.innerText = "Sair da mesa";
        statusMessage.textContent = 'Usuário Conectado!';
    } else {
        disconnectWebSocket();
        btnSentarAMesa.classList.replace("bg-orange-500", "bg-blue-500");
        btnSentarAMesa.innerText = "Sentar na mesa";
        statusMessage.textContent = 'Usuário desconectado';
    }
});
