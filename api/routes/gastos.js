const express = require('express');
const gastosRoutes = express.Router();
const { Conexao } = require("../database-connection");

/**
 * @description
 *
 *
 * @author Lucas Metzker
 *
 * @returns Retorna
 *
**/
gastosRoutes.get("/obter-gastos", (req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Obtém os parametros da requisição
    const { data } = req.query;

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT *
      FROM gastos
     WHERE data = '${data}'
    `;

    /* -------------------------------------------------------------------------- */

    // Obtém a lista de usuários através do comando fornecido
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json(results);
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

/**
 * @description
 *
 *
 * @author Lucas Metzker
 *
 * @returns Retorna
 *
**/
gastosRoutes.post("/inserir-gasto", (req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Obtém os parametros da requisição
    const { descricao, valor, funcionario } = req.body;

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    INSERT
      INTO gastos
         ( descricao
         , valor
         , funcionario
         , data
         )
    VALUES
         ( '${descricao}'
         , '${valor}'
         , '${funcionario}'
         , CURDATE()
         )
    `;

    /* -------------------------------------------------------------------------- */

    //
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json(results);
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

module.exports = gastosRoutes;