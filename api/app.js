require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/Routes');

// Middleware para interpretar JSON
const app = express();
app.use(bodyParser.json());

// Usar as rotas de livros
app.use('/api', bookRoutes);

// Inicializar o servidor
const port = parseInt(process.env.PORT, 10) || 9998;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
