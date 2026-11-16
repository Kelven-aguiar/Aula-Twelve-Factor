// Solução de referência da atividade The Twelve-Factor App.
// Esta versão carrega configurações do ambiente, sem valores fixos no código.

require('dotenv').config();
const express = require('express');
const app = express();

// Fator III — configuração mantida no ambiente.
const nomeEscola = process.env.NOME_ESCOLA || 'Sistema Escolar';

// Fator VII — aplicação oferece HTTP em uma porta configurável.
const PORT = Number(process.env.PORT) || 3000;

const alunos = [
  { id: 1, nome: 'Ana', curso: 'Desenvolvimento de Sistemas' },
  { id: 2, nome: 'Bruno', curso: 'Desenvolvimento de Sistemas' },
  { id: 3, nome: 'Camila', curso: 'Redes de Computadores' }
];

app.get('/', (req, res) => {
  res.json({
    sistema: nomeEscola,
    mensagem: 'API de gerenciamento escolar funcionando',
    rotas: ['/', '/alunos']
  });
});

app.get('/alunos', (req, res) => {
  res.json({
    escola: nomeEscola,
    quantidade: alunos.length,
    alunos
  });
});

app.listen(PORT, () => {
  console.log(`API da escola disponível em http://localhost:${PORT}`);
});
