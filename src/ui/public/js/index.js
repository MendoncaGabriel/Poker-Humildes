let socket = null;
let isConnected = false;

const mesa = document.getElementById('mesa');
const btnSentarAMesa = document.getElementById('btnSentarAMesa');

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
    mesa.innerHTML = ''
    chairs.forEach(e => {
        const cor = corAleatoria();
        mesa.innerHTML += `
        <div id="${e.id}" class="${cor} rounded-full w-20 h-20 flex items-center justify-center">
            <p class="text-white font-bold">${e.name}</p>
        </div>`
    })
}

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:3000/ws');

    socket.addEventListener('open', () => {
        isConnected = true;
        send({
            msg: 'sentar player na mesa',
            data: {
                id: Math.random().toString(36).substr(2, 20),
                name: 'gabriel'
            }
        })
    });

    socket.addEventListener('message', (event) => {
        const mensagem = JSON.parse(event.data)
        if (mensagem.msg == "exibir players da mesa") {
            showPlayersInTable(mensagem.chairs)
        }
    });

    socket.addEventListener('close', () => {
        isConnected = false;
        console.log('WebSocket desconectado.');
    });

    socket.addEventListener('error', (error) => {
        console.error('Erro no WebSocket: ', error);
    });
}

function disconnectWebSocket() {
    if (socket) {
        socket.close();
        console.log('WebSocket desconectado.');
    }
}

function send(message) {
    if (isConnected && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn('Tentativa de enviar dados enquanto o WebSocket não está conectado.');
    }
}


btnSentarAMesa.addEventListener('click', () => {
    if (!isConnected) {
        connectWebSocket();
        btnSentarAMesa.classList.replace("bg-blue-500", "bg-orange-500")
        btnSentarAMesa.innerText = "Sair da mesa"
        statusMessage.textContent = 'Usuário Conectado!';

    } else {
        disconnectWebSocket();
        btnSentarAMesa.classList.replace("bg-orange-500", "bg-blue-500")
        btnSentarAMesa.innerText = "Sentar na mesa 1"
        statusMessage.textContent = 'Usuário desconectado';
        mesa.innerHTML = ""

    }
});