# mesa
## propriedades
- aposta minima da mesa: 10, 20 etc...
- min player: 2
- lugares: 7
- pot: number
- cadeiras: array: Players[]

## Cartas comunitarias
## propriedades
- Flop: 3 cartas
- Turn: 1 carta
- River: 1 carta

## Rankear a potencia das combinações de cartas
- 

# Baralho 
## propriedades
- quantidade: 52
- numeros: 1 a 13
- naipes: paus, espada, ouro, copas

# Delar
## Metodo
- função que embaralha o array
- função para distribuir cartas: primeiro para mesa
    - flop, turn, river
- função para distribuir cartas para os jogadores:
    - percorrer a minha lista de players (cadeiras) adicionando as cartas a para os player
    - selecionar uma carta da lista, randomicamente e remover da lista do baralho

# Player
## propriedades
- desistencia: false
- carteira 
- pot de aposta do jogador (a aposta sai da carteir, vai pro pote do jogador e depois para o por da mesa)
- mãos (2 cartas)
- jogadas: apostar, passar, desistir (permanece sentado), almentar
- Estados
    - minha vez: false, (exatamente um um player com true) (não pode ter mais de um como estado true)
    - sentado: false
- Abandonar a mesa (desiste tambem da aposta)
    


---------------------- Rotinas globais ----------------------
## Rotina para gerenciar estado da vez de jogar
- o estado de quem e a vez,
- passar a vez para o proximo gerenciando os estados dos playes
- função para ciclar lista (o primeiro jogador da lista vira o ultimo da lista) (momento: quando acabar a rodada)

## Rotina para verificar apostas
função para percorrer os jogadores da mesa e verificar se todos os pots dos jogadores estão iguais, 
soma o total referente ao pot dos jogadores sentados e move para o pot da mesa. (função so e ativada no final de cada rodada de apostas)

## Verificar jogador campeão
- vericar qual combinação de cartãs entre os jogadores sentado a mesa tem maior potencia


---------------------- o que e uma partida ----------------------

## 1. primeiro momento de apostas - obrigatorio (Pre flop)
1. verificar player sentado nas cadeiras (lista cadeiras)
2. o primeiro da lista tem a menor aposta não opcional
3. o segundo da lista tem a aposta não opcionao, o dobro do primeiro

## 2. distribuição das cartas para todos os jogadores 
## 3. aposta lives (começa pelo terceiro jogador e tem que ser maior ou igual ao maior pot do jogador sentado a mesa) - opcional
    - filtro sort para ver qual e o maior pot de jogador da mesa
## 4. mostrar o flop
## 5. segundo momento de apostas - livre (pre turn)
    1. o primero a apostar e quem esta com a vez
    2. executar rotina de posta
    3. mostrar carta turn

## 6. terceirto momento de apostas - livre (pre river)
    1. o primero a apostar e quem esta com a vez
    2. executar rotina de posta
    3. mostrar carta river

## 7. quarto momento de apostas - livre (pos river)
    1. o primero a apostar e quem esta com a vez
    2. executar rotina de posta

## 8. verificar ganhador
- qual jogador possue a combinação de cartas mais forte da mesa
- mover pote da mesa para o jogador campeão
- identifica com funciona empates???

## 9. reiniciar
- destrancar as cadeiras vazias para outros jogadores


