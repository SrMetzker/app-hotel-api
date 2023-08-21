const express = require('express');
const loginRoutes = express.Router();
const { Conexao } = require("../database-connection");

/**
 * @description
 * EndPoint responsável por validar o login do usuário;
 *
 * @author Lucas Metzker
 *
 * @returns Retorna um boolean que diz se está autorizado ou não.
 *
**/
loginRoutes.post("/login", (req, res) => {
  try {

    // Obtém os parametros da requisição
    const { usuario, senha } = req.body;

    /* -------------------------------------------------------------------------- */

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT id
         , nome
         , usuario
         , cargo
         , senha
      FROM usuarios
     WHERE usuario = '${usuario}'
    `;

    /* -------------------------------------------------------------------------- */

    // Vai no banco de dados obter as informações do usuário e valida o login
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      if (results.length == 0)
        return res.status(500).json({erro: "Usuário não encontrado!"});

      if (results[0].senha == senha)
        return res.status(200).json({
          authorized: true,
          usuario: results[0].usuario || "",
          nome: results[0].nome || "",
          cargo: results[0].cargo || ""
        });
      else
        return res.status(401).json({
          authorized: false,
          erro: "Usuário não autorizado!",
        });
    });

  } catch (e) {
    res.status(500).json({erro: e.message});
  }
});

module.exports = loginRoutes;