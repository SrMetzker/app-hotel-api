const mysql = require("mysql2");
require("dotenv").config()

function Conexao() {

  // Desestruturação dos parametos do ENV
  const { host, user, password, database } = process.env;

  /* -------------------------------------------------------------------------- */

  // Cria a conexão com o banco de dados
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  /* -------------------------------------------------------------------------- */

  // Executa a conexão
  connection.connect((err) => {
    if (err) throw err;
  });

  /* -------------------------------------------------------------------------- */

  // Retorna a conexão
  return connection;
}

module.exports = { Conexao };