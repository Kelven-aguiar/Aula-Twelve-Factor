// API da Escola — versão inicial para a atividade.
// ATENÇÃO: há problemas intencionais a serem corrigidos pelos alunos.

const express = require('express');
const app = express();

// PROBLEMA 1: nome da escola fixo no código.
const nomeEscola = 'Escola de Informática';

// PROBLEMA 2: porta fixa no código.
const PORT = 3000;

// Dados fictícios: não há banco de dados nesta atividade.
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
