# Mesa
### Propriedades:
- **Aposta mínima:** 10, 20 etc.
- **Mínimo de jogadores:** 2
- **Máximo de lugares:** 7
- **Pot da mesa:** valor total das apostas
- **Cadeiras:** lista de jogadores (array de `Player`)

# Cartas Comunitárias
### Propriedades:
- **Flop:** 3 cartas
- **Turn:** 1 carta
- **River:** 1 carta

# Baralho
### Propriedades:
- **Total de cartas:** 52
- **Valores:** 1 a 13 (Ás a Rei)
- **Naipes:** Paus, Espadas, Ouros, Copas

# Dealer
### Métodos:
- **Embaralhar baralho**: função para embaralhar o array de cartas.
- **Distribuir cartas comunitárias**: para flop, turn e river.
- **Distribuir cartas aos jogadores**: atribui cartas aos jogadores da mesa removendo-as do baralho.

# Jogador (Player)
### Propriedades:
- **Carteira:** saldo disponível
- **Aposta atual:** valor apostado que sai da carteira e vai para o pot do jogador
- **Mãos:** 2 cartas na mão
- **Status de jogo:** 
  - **Minha vez:** controla a vez do jogador
  - **Sentado:** se está na mesa
  - **Desistiu:** se desistiu da rodada
- **Ações:**
  - **Apostar, passar, desistir, aumentar.**
  - **Abandonar mesa:** sai da rodada e da mesa.

---

## Rotinas Globais

### Gerenciar vez de jogar
- Cicla os jogadores na lista, garantindo que apenas um jogador tenha sua vez ativa.

### Verificar apostas
- Verifica se todos os jogadores têm o mesmo valor de aposta.
- Move o total das apostas para o pot da mesa ao final de uma rodada de apostas.

### Verificar vencedor
- Avalia a combinação de cartas dos jogadores para definir o vencedor.

---

## Fluxo de uma Partida de Pôquer

1. **Apostas iniciais (Pre-Flop)**:
   - Verifica jogadores sentados.
   - Primeiro e segundo jogadores realizam apostas obrigatórias (pequena e grande blind).

2. **Distribuir cartas aos jogadores.**

3. **Apostas livres** (a partir do terceiro jogador), devem igualar ou aumentar a maior aposta da mesa.

4. **Mostrar o Flop** (3 cartas comunitárias).

5. **Segundo momento de apostas** (Pre-Turn).

6. **Mostrar o Turn** (1 carta).

7. **Terceiro momento de apostas** (Pre-River).

8. **Mostrar o River** (1 carta).

9. **Quarto momento de apostas** (Pós-River).

10. **Verificar vencedor**:
    - Avaliar combinações de cartas.
    - Transferir o pot da mesa ao vencedor.

11. **Reiniciar a mesa**:
    - Desbloquear as cadeiras vazias para novos jogadores.
