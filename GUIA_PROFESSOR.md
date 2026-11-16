# Guia do professor — gabarito da atividade Twelve-Factor

> Este arquivo e a solução de código ficam apenas na branch `gabarito-professor`. Para distribuir aos alunos, indique a branch `main`.

## Objetivo da aula

Em uma API simples de escola, aplicar três práticas do Twelve-Factor:

1. **II — Dependências:** instalação e declaração explícita de `express` e `dotenv` no `package.json`.
2. **III — Configurações:** leitura do nome da escola de `process.env.NOME_ESCOLA`, carregado localmente de `.env`.
3. **VII — Vínculo de portas:** o Express oferece HTTP por `app.listen(PORT)` e a porta pode ser definida pelo ambiente.

## Organização sugerida (16h20–17h30)

| Horário | O que fazer |
| --- | --- |
| 16h20–16h35 | Alunos fazem download, investigam o erro de dependência e instalam Express |
| 16h35–16h55 | Instalam dotenv, criam `.env` e alteram o nome da escola para ler `process.env` |
| 16h55–17h05 | Substituem a porta fixa por `process.env.PORT`, com fallback |
| 17h05–17h15 | Testam os dois ambientes, alterando somente o `.env` e reiniciando o servidor |
| 17h15–17h20 | Respondem às perguntas |
| 17h20–17h30 | Correção coletiva e discussão |

## Preparação antes da aula

- Testar `node -v`, `npm -v` e o acesso a `registry.npmjs.org` nos computadores.
- Se a rede da escola bloquear npm, instalar antecipadamente as dependências em um computador de apoio e preparar uma alternativa offline. A demonstração de dependências fica reduzida nesse caso.
- Ter uma cópia local deste repositório e uma cópia da branch `gabarito-professor`.
- O projeto não exige PostgreSQL, conta de nuvem ou variáveis secretas reais.

## Resolução técnica

### 1. Dependências

Na branch inicial, `server.js` importa `express`, mas `package.json` não o declara. `npm install` sozinho não resolve o problema e `npm start` produz `Cannot find module 'express'`.

Os alunos devem executar:

~~~bash
npm install express
npm install dotenv
~~~

O npm registra os dois pacotes em `dependencies` e gera ou atualiza `package-lock.json`. A branch do gabarito já os declara; nela, basta executar `npm install`.

### 2. Configurações

Criar `.env` localmente (não publicar esse arquivo):

~~~env
PORT=4000
NOME_ESCOLA="Escola PROZ"
~~~

No início do código, chamar `require('dotenv').config();`. Usar:

~~~js
const nomeEscola = process.env.NOME_ESCOLA || 'Sistema Escolar';
~~~

### 3. Vínculo de portas

Usar:

~~~js
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API da escola disponível em http://localhost:${PORT}`);
});
~~~

Ressaltar que o fator VII é sobre **a aplicação exportar o serviço HTTP ouvindo uma porta**; o uso da variável `PORT` é uma forma prática de adaptar esse contrato a ambientes diferentes.

### 4. Testes esperados

| `.env` | URL | Resultado |
| --- | --- | --- |
| `PORT=4000`, `NOME_ESCOLA="Escola PROZ"` | `http://localhost:4000/alunos` | JSON com `"escola": "Escola PROZ"` e três alunos |
| `PORT=3000`, `NOME_ESCOLA="Escola de Informática"` | `http://localhost:3000/alunos` | JSON com `"escola": "Escola de Informática"` e três alunos |

Após alterar o `.env`, **parar e reiniciar** o servidor. Não é necessário modificar o código-fonte.

## Respostas esperadas às questões do ATIVIDADE.md

1. **Erro:** módulo `express` não encontrado. O pacote é utilizado no código, mas não foi instalado/declarado no projeto inicial.
2. **`package.json`:** metadados, scripts e dependências do projeto. `npm install express` adiciona o pacote em `dependencies`, instala em `node_modules` e gera/atualiza o lockfile.
3. **Configuração no código:** exige alterar o código a cada ambiente, podendo causar erros, divergências e vazamento de informações sensíveis.
4. **`process.env`:** acesso às variáveis do ambiente do processo Node.js. A biblioteca dotenv lê o `.env` local e disponibiliza esses valores em `process.env`.
5. **`.env` com segredos:** publicar credenciais pode permitir acesso indevido a recursos. O `.gitignore` exclui o arquivo, enquanto `.env.example` pode ser versionado sem segredos.
6. **`app.listen(PORT)`:** inicia o servidor HTTP e passa a escutar requisições nessa porta. A porta variável permite adaptação ao ambiente sem alterar o código.
7. **Dois ambientes:** alterar `PORT` e `NOME_ESCOLA` no `.env`, parar e reiniciar a API; acessar cada URL correspondente.

## Critérios de avaliação (sugestão: 10 pontos)

- 2 pontos — instalar e declarar corretamente Express e dotenv.
- 3 pontos — criar `.env`, carregar dotenv e ler o nome da escola por `process.env`.
- 2 pontos — utilizar `process.env.PORT` com valor padrão e configurar `app.listen`.
- 1 ponto — demonstrar os dois testes mudando apenas o ambiente.
- 2 pontos — respostas das questões coerentes com os conceitos.

## Erros frequentes

- Executar comandos fora da pasta do projeto.
- Não instalar `dotenv` antes de chamar `require('dotenv')`.
- Criar `env` ou `.env.txt` em vez de `.env` (especialmente no Windows).
- Escrever `PORT` como texto literal em `app.listen` em vez de usar a variável.
- Alterar `.env` sem reiniciar o processo.
- Deixar duas instâncias disputando a mesma porta (`EADDRINUSE`).

## Limitações didáticas intencionais

- Esta atividade aplica **3 dos 12 fatores**, não equivale à adoção integral do Twelve-Factor.
- A API usa uma lista fictícia em memória, sem banco real, para concentrar a atenção nos três conceitos.
- O `.env` é uma ferramenta de desenvolvimento local; em cloud, as variáveis normalmente são fornecidas pela plataforma.
- Uma versão atual de Node.js e o npm ainda precisam estar instalados no ambiente.

## Fontes

- https://12factor.net/pt_br/dependencies
- https://12factor.net/pt_br/config
- https://12factor.net/pt_br/port-binding
- https://docs.npmjs.com/cli/commands/npm-install
- https://expressjs.com/
