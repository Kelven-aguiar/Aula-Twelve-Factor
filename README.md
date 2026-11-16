# Aula prática — The Twelve-Factor App

**Curso técnico em Desenvolvimento de Sistemas | Duração sugerida: 60 minutos de atividade + 10 minutos de correção**

## O desafio

Você recebeu o código de uma **API de gerenciamento escolar**, desenvolvida em Node.js com Express. Ela possui duas rotas:

- `GET /` — informações do sistema.
- `GET /alunos` — lista fictícia de alunos (não usa banco de dados).

O projeto foi entregue com **três problemas intencionais**: as dependências não estão declaradas, as configurações estão escritas no código e a porta é fixa. Sua missão é preparar a aplicação para executar em ambientes diferentes, sem reescrever a lógica do sistema.

### O que você vai aprender?

| Fator | Boa prática | O que será feito |
| --- | --- | --- |
| **II — Dependências** | Declarar explicitamente o que a aplicação utiliza | Instalar Express e registrar as bibliotecas no `package.json` |
| **III — Configurações** | Manter configurações do ambiente fora do código | Criar `.env` e ler valores com `process.env` |
| **VII — Vínculo de portas** | Disponibilizar o serviço HTTP por uma porta de rede | Fazer `app.listen` usar a porta fornecida pelo ambiente |

> **Importante:** configurar a porta por variável de ambiente é uma aplicação prática do fator VII, mas o fator também envolve a própria aplicação oferecer um serviço HTTP escutando nessa porta.

## Pré-requisitos

- Node.js **18 ou superior**, com npm (`node -v` e `npm -v`).
- Visual Studio Code e um navegador.
- Internet para instalar os pacotes npm pela primeira vez.
- Git é opcional: você também pode baixar o ZIP pelo botão **Code > Download ZIP**.

## Etapa 1 — Receba o projeto e descubra o problema (16h20–16h35)

1. Clone este repositório ou baixe o ZIP:

   ~~~bash
   git clone https://github.com/Kelven-aguiar/Aula-Twelve-Factor.git
   cd Aula-Twelve-Factor
   ~~~

2. Abra a pasta no VS Code e um terminal **dentro da pasta do projeto**.
3. Observe os arquivos `server.js` e `package.json`. Procure as bibliotecas utilizadas no código.
4. Execute os comandos:

   ~~~bash
   npm install
   npm start
   ~~~

5. **O erro é esperado.** Leia a mensagem `Cannot find module 'express'` e descubra por que ela apareceu.
6. Resolva o problema usando:

   ~~~bash
   npm install express
   npm start
   ~~~

7. Abra [http://localhost:3000](http://localhost:3000) e [http://localhost:3000/alunos](http://localhost:3000/alunos).

**Observe:** o que mudou no `package.json` depois de instalar o Express? Surgiram novos arquivos?

## Etapa 2 — Separe as configurações do código (16h35–16h55)

1. Pare o servidor com **Ctrl + C**.
2. Abra `server.js` e localize o nome da escola e a porta escritos diretamente no código.
3. Instale a biblioteca que carrega o arquivo `.env`:

   ~~~bash
   npm install dotenv
   ~~~

4. Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o conteúdo de `.env.example`:

   ~~~env
   PORT=4000
   NOME_ESCOLA="Escola PROZ"
   ~~~

5. No início do arquivo `server.js`, carregue o `.env`:

   ~~~js
   require('dotenv').config();
   ~~~

6. Substitua o nome fixo da escola por um valor obtido de `process.env.NOME_ESCOLA`.
7. Guarde um valor padrão para o nome caso a variável não exista (por exemplo, `Sistema Escolar`).

**Dica:** `process.env.NOME_ESCOLA || 'Sistema Escolar'`.

## Etapa 3 — Configure a porta de execução (16h55–17h05)

1. Altere a constante da porta para utilizar `process.env.PORT`.
2. Mantenha `3000` como porta padrão caso a variável não tenha sido informada.
3. Verifique que `app.listen(...)` recebe essa constante, e não o número `3000` escrito diretamente.

**Dica:** `const PORT = Number(process.env.PORT) || 3000;`

4. Execute novamente:

   ~~~bash
   npm start
   ~~~

5. Acesse **http://localhost:4000** e **http://localhost:4000/alunos**.

## Etapa 4 — Teste dois ambientes (17h05–17h15)

1. Deixe `PORT=4000` e `NOME_ESCOLA="Escola PROZ"` no `.env`. Reinicie o servidor e verifique a resposta.
2. Pare o servidor com **Ctrl + C**.
3. Altere o `.env` para `PORT=3000` e `NOME_ESCOLA="Escola de Informática"`.
4. Reinicie o servidor e verifique a resposta em **http://localhost:3000**.
5. Confirme que **você não precisou alterar a lógica do `server.js`** para mudar o ambiente.

**Atenção:** o arquivo `.env` é ignorado pelo Git por segurança. O `.env.example` é apenas um modelo, sem credenciais reais.

## Etapa 5 — Responda e entregue (17h15–17h20)

Abra o arquivo **[ATIVIDADE.md](ATIVIDADE.md)**, responda às questões e mostre ao professor a aplicação funcionando nas duas configurações.

### Critérios de conclusão

- [ ] O Express e o dotenv estão declarados em `package.json`.
- [ ] A API responde nas rotas `/` e `/alunos`.
- [ ] O nome da escola vem de uma variável de ambiente.
- [ ] A porta vem de uma variável de ambiente, com valor padrão.
- [ ] A mudança de nome e porta funciona após reiniciar o servidor, sem editar o código.
- [ ] O arquivo `.env` não é enviado ao repositório.

## Se algo der errado

| Problema | O que verificar |
| --- | --- |
| `Cannot find module 'express'` | Execute `npm install express` na pasta correta |
| `Cannot find module 'dotenv'` | Execute `npm install dotenv` |
| `EADDRINUSE` | Outra aplicação já está utilizando a porta; pare o servidor anterior ou teste outra porta |
| `localhost:4000` não abre | Confira o `.env`, o `app.listen`, o terminal e se reiniciou a API |
| Nome não mudou | Confira `process.env.NOME_ESCOLA` e se o `.env` foi carregado antes do uso |

## Referências oficiais

- [The Twelve-Factor App — Dependências](https://12factor.net/pt_br/dependencies)
- [The Twelve-Factor App — Configurações](https://12factor.net/pt_br/config)
- [The Twelve-Factor App — Vínculo de portas](https://12factor.net/pt_br/port-binding)
- [Documentação do npm](https://docs.npmjs.com/cli/commands/npm-install)
- [Documentação do Express](https://expressjs.com/)
