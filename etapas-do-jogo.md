### Organização Geral do Projeto

1. **Backend (Servidor):**
   - **Mesas (Tables):** Representam as mesas do jogo. Cada mesa é uma entidade independente que gerencia o fluxo do jogo, as cartas distribuídas, as apostas e o pote. Mesmo sem jogadores, a mesa deve estar pronta para ser iniciada quando um jogador entra.
   - **Jogadores (Players):** Entidades que podem se conectar e desconectar das mesas. O estado do jogador (mão, saldo, apostas) deve ser salvo, permitindo que ele saia e entre novamente sem afetar o jogo.
   - **Distribuidor (Dealer):** Gerencia o baralho e as etapas do jogo, como distribuir cartas e avançar nas fases do jogo.
   - **Estado da Mesa (Table State):** Controla em qual fase a mesa está (apostas iniciais, flop, turn, etc.).

2. **Frontend (Cliente):**
   - **Interface da Mesa:** Mostra o estado atual da mesa, as cartas comunitárias, as apostas, o pote e as ações possíveis para o jogador.
   - **Ações do Jogador:** Permite que o jogador faça apostas, veja sua mão e acompanhe o progresso da mesa.

### Etapas do Jogo de Poker

1. **Apostas Iniciais (Blinds)**
   - A rodada começa com as apostas obrigatórias, como o **small blind** e o **big blind**, colocadas por dois jogadores na mesa.
   - Se não houver jogadores suficientes, a mesa pode "auto-rodar", ou seja, pular essa fase até que mais jogadores entrem.

2. **Distribuição de Cartas**
   - O dealer distribui duas cartas para cada jogador (mão inicial). Se não houver jogadores, as cartas não são distribuídas, mas o fluxo da mesa segue.

3. **Primeira Rodada de Apostas**
   - Cada jogador tem a oportunidade de apostar, pagar ou desistir. Um temporizador pode ser usado para que as apostas sejam automáticas ou a mesa avance se os jogadores não fizerem nada.

4. **Flop**
   - Três cartas comunitárias são reveladas na mesa. Em seguida, outra rodada de apostas começa.

5. **Turn**
   - Uma quarta carta comunitária é revelada, seguida de mais uma rodada de apostas.

6. **River**
   - A quinta e última carta comunitária é revelada, seguida da rodada final de apostas.

7. **Showdown (Revelação das Cartas)**
   - Os jogadores que ainda estão na partida revelam suas cartas, e o dealer decide quem ganhou com base nas combinações de mãos de poker.

8. **Redistribuição do Pote**
   - O vencedor da rodada recebe o pote. O jogo se reinicia para a próxima mão.

### Gerenciamento de Jogadores

- **Entrada e Saída Dinâmica:**
   - Quando um jogador entra na mesa, ele deve aguardar a próxima mão para poder participar. Se ele sair antes do showdown, suas apostas continuam na mesa, mas ele é removido da rodada seguinte.
   
- **Ação Automática:**
   - Caso um jogador não tome uma ação em um determinado tempo (fold, call, raise), a mesa pode avançar automaticamente, mantendo o fluxo do jogo ativo.

### Organização em Código

1. **Mesas (`Tables`)**
   - Cada mesa teria um estado que inclui as fases do jogo, jogadores presentes e as cartas comunitárias.
   - A mesa avança nas fases de acordo com um cronograma, não dependendo dos jogadores estarem presentes.

2. **Jogadores (`Players`)**
   - Os jogadores são entidades que podem entrar e sair de uma mesa.
   - As ações do jogador, como apostar, desistir ou aumentar a aposta, são enviadas ao servidor, e a mesa é notificada.

3. **Distribuidor (`Dealer`)**
   - O dealer é responsável por embaralhar, distribuir cartas, gerenciar o pote e avançar pelas fases do jogo.

### Exemplo de Fluxo

- **Fase 1:** A mesa começa com uma rodada de blinds (small e big blinds). O dealer define a ordem e, mesmo sem jogadores, o jogo avança.
- **Fase 2:** Se jogadores entrarem, o dealer distribui as cartas. Jogadores podem entrar e sair, mas se saírem, não interferem no andamento.
- **Fase 3:** Rodadas de apostas, flop, turn e river seguem de forma automática, com ou sem jogadores. Se não houver apostas manuais, a mesa resolve automaticamente (ex: fold para ausentes).
