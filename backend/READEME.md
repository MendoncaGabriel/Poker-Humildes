
```markdown
# Poker dos Humildes

Este é um projeto de poker simplificado desenvolvido para estudo e prática de TypeScript. O jogo é estruturado para simular uma partida básica de poker com funcionalidades para distribuir cartas e gerenciar jogadores.

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Executar o Projeto

1. docker compose up -d

Para iniciar o projeto em modo de desenvolvimento, utilize o comando:

```bash
npm run dev
```

Este comando irá iniciar o projeto com `tsx` e ficará monitorando alterações nos arquivos para recompilar automaticamente.

## Build

Para criar uma versão de produção do projeto, execute:

```bash
npm run build
```

Este comando irá compilar o código TypeScript e gerar os arquivos JavaScript no diretório de build.

## Estrutura do Projeto

- **`src/`**: Contém o código-fonte do projeto.
  - **`cheap/`**: Define as cartas e baralho.
  - **`player.ts`**: Define a classe do jogador.
  - **`table.ts`**: Define a classe da mesa.
  - **`dealer.ts`**: Define a classe do dealer.
- **`package.json`**: Gerencia as dependências e scripts do projeto.
- **`tsconfig.json`**: Configurações do TypeScript.
- **`README.md`**: Este arquivo.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Se encontrar algum problema ou tiver sugestões de melhorias, abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```

### Explicação dos principais pontos:

1. **Instalação**: Instruções para instalar dependências.
2. **Executar o Projeto**: Como iniciar o projeto em modo de desenvolvimento.
3. **Build**: Como compilar o projeto para produção.
4. **Estrutura do Projeto**: Descrição básica da organização dos arquivos e diretórios do projeto.
5. **Contribuição**: Diretrizes para contribuições.
6. **Licença**: Informação sobre a licença do projeto. 
