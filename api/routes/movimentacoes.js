const express = require('express');
const movimentacoesRoutes = express.Router();
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
movimentacoesRoutes.get("/totalizar/entradas", (req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Obtém os parametros da requisição
    const { data } = req.query;

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT COALESCE(sum(valor), 0) as valor
      FROM movimentacoes
     WHERE tipo = 'Entrada'
       AND data = '${data}'
    `;

    /* -------------------------------------------------------------------------- */

    // Obtém a lista de usuários através do comando fornecido
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json(results[0]);
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
movimentacoesRoutes.get("/totalizar/saidas", (req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Obtém os parametros da requisição
    const { data } = req.query;

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT COALESCE(sum(valor), 0) as valor
      FROM movimentacoes
     WHERE tipo = 'Saida'
       AND data = '${data}'
    `;

    /* -------------------------------------------------------------------------- */

    // Obtém a lista de usuários através do comando fornecido
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

    return res.status(200).json(results[0]);
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
movimentacoesRoutes.get("/totalizar/balanco", (_req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT COALESCE(sum(entradas), 0) as entradas
         , COALESCE(sum(saidas), 0) as saidas
         , (COALESCE(sum(entradas), 0) - COALESCE(sum(saidas), 0)) as balanco
      FROM (
            SELECT COALESCE(sum(valor), 0) as entradas
                 , '0' as saidas
              FROM movimentacoes
             WHERE tipo = 'Entrada'
               AND data = CURDATE()

            UNION

            SELECT '0' as entradas
                 , COALESCE(sum(valor), 0) as saidas
              FROM movimentacoes
             WHERE tipo = 'Saida'
               AND data = CURDATE()
            ) as mov
    `;

    /* -------------------------------------------------------------------------- */

    // Obtém a lista de usuários através do comando fornecido
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json(results[0]);
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
movimentacoesRoutes.get("/obter-movimentacoes", (req, res) => {
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
      FROM movimentacoes
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
movimentacoesRoutes.get("/obter-movimentacoes-totalizar", (req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Obtém os parametros da requisição
    const { data } = req.query;

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT COALESCE(sum(entradas), 0) as entradas
         , COALESCE(sum(saidas), 0) as saidas
         , (COALESCE(sum(entradas), 0) - COALESCE(sum(saidas), 0)) as balanco
      FROM (
            SELECT COALESCE(sum(valor), 0) as entradas
                 , '0' as saidas
              FROM movimentacoes
             WHERE tipo = 'Entrada'
               AND data = '${data}'

            UNION

            SELECT '0' as entradas
                 , COALESCE(sum(valor), 0) as saidas
              FROM movimentacoes
             WHERE tipo = 'Saida'
             AND data = '${data}'
            ) as mov
    `;
    console.log(sql);
    /* -------------------------------------------------------------------------- */

    // Obtém a lista de usuários através do comando fornecido
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json(results[0]);
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

module.exports = movimentacoesRoutes;