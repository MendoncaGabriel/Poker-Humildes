/poker-game
├── /src
│   ├── /server               # Tudo relacionado ao servidor (Express)
│   │   ├── /controllers       # Controladores de rotas e lógica
│   │   ├── /repositories      # Padrão Repository, lida com a lógica de acesso a dados
│   │   ├── /services          # Lógica de negócio que interage com os repositórios
│   │   ├── /middlewares       # Middlewares do Express
│   │   ├── /config            # Configurações de servidor e ambiente
│   │   └── server.ts          # Arquivo principal que inicializa o servidor
│   ├── /game                  # Lógica e regras de jogo
│   │   ├── /entities          # Entidades principais (Player, Dealer, Card, Chip, Table, etc.)
│   │   ├── /rules             # Regras do jogo (regras de poker, condições de vitória)
│   │   ├── /gameplay          # Controle do fluxo de jogo (rodadas, apostas, turnos)
│   │   ├── /events            # Eventos do jogo (para comunicação com o front-end ou logs)
│   │   └── Game.ts            # Módulo principal que gerencia a lógica de jogo
│   ├── /ui                    # Parte visual (se estiver no servidor ou parte do front-end)
│   │   ├── /views             # HTML, templates, etc.
│   │   ├── /assets            # CSS, imagens, etc.
│   │   └── /components        # Componentes reutilizáveis de UI
│   └── /shared                # Código compartilhado entre o servidor e o jogo
│       ├── /types             # Definições de tipos (TypeScript)
│       ├── /utils             # Funções utilitárias
│       └── /interfaces        # Interfaces comuns (ex.: jogador, carta, mesa)
├── /tests                     # Testes unitários, de integração e e2e
├── /docs                      # Documentação do projeto
├── /scripts                   # Scripts de build, deploy ou automação
├── package.json
├── tsconfig.json              # Configuração do TypeScript
└── README.md
