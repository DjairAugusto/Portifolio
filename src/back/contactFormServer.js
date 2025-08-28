const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
// Permitir qualquer origem durante desenvolvimento
app.use(cors({
  origin: '*',
}));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Recebido:', { name, email, message });
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Configure seu transporte SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'djairaugusto08@gmail.com', // Seu email
      pass: 'SUA_SENHA_APP', // Troque pela senha de app do Gmail
    },
  });

  try {
    const info = await transporter.sendMail({
      from: email,
      to: 'djairaugusto08@gmail.com', // Seu email
      subject: `Contato do portfólio: ${name}`,
      text: message,
    });
    console.log('Email enviado:', info.response);
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    let errorMsg = 'Erro ao enviar email.';
    if (err.response) errorMsg += ' ' + err.response;
    if (err.code === 'EAUTH') errorMsg = 'Falha de autenticação: verifique o email e senha de app.';
    res.status(500).json({ error: errorMsg });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
