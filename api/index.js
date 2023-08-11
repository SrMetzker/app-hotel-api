const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user');
const loginRoutes = require('./auth/login');
require("dotenv").config()

// Executa uma instância do Express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(loginRoutes);

// Porta padrão da API
app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
