# Atividade — Diagnóstico e preparação de uma API para a nuvem

**Nome:** ______________________________________  **Data:** ____ / ____ / ______

## Situação-problema

Você recebeu uma API de gerenciamento escolar que funciona no computador de um desenvolvedor, mas ainda não está preparada para funcionar em outros ambientes.

Utilize o roteiro do **[README.md](README.md)** para corrigir o projeto. Depois, responda às perguntas com suas palavras.

### Parte A — Dependências

**1.** Quando você executou o projeto antes de instalar o Express, qual erro apareceu? Por que ele aconteceu?

**Resposta:**


**2.** Para que serve o arquivo `package.json`? O que o comando `npm install express` modificou no projeto?

**Resposta:**


### Parte B — Configurações

**3.** Qual é o problema de escrever diretamente no código configurações que mudam conforme o ambiente, como a porta ou o endereço de um banco de dados?

**Resposta:**


**4.** Qual é a função de `process.env`? Explique como o arquivo `.env` foi utilizado nesta atividade.

**Resposta:**


**5.** Por que não devemos publicar um arquivo `.env` contendo senhas reais no GitHub?

**Resposta:**


### Parte C — Vínculo de portas e testes

**6.** O que o método `app.listen(PORT)` faz? Por que é útil permitir que a porta seja definida pelo ambiente?

**Resposta:**


**7.** Sem modificar o código-fonte, quais valores você alterou para executar o sistema primeiro em `localhost:4000` e depois em `localhost:3000`?

**Resposta:**


### Comprovação prática

Mostre ao professor os dois testes (um de cada vez, reiniciando o servidor):

- [ ] `http://localhost:4000/alunos` exibindo **Escola PROZ**.
- [ ] `http://localhost:3000/alunos` exibindo **Escola de Informática**.
- [ ] `package.json` contendo as dependências `express` e `dotenv`.
- [ ] `server.js` lendo o nome e a porta por variáveis de ambiente.

**Entrega:** respostas às perguntas e demonstração do projeto funcionando. Não é necessário fazer deploy na AWS.
