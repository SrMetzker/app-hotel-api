const express = require('express');
const userRoutes = express.Router();
const { Conexao } = require("../database-connection");

/**
 * @description
 * EndPoint reponsável por obter a lista de todos os usuários
 * do banco
 *
 * @author Lucas Metzker
 *
 * @returns Retorna a lista de usuários encontrados
 *
**/
userRoutes.get("/users", (_req, res) => {
  try {

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    SELECT id
        , nome
        , usuario
        , cargo
      FROM usuarios
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
 * EndPoint responsável por obter um usuário específico do banco
 * de dados.
 *
 * @author Lucas Metzker
 *
 * @returns Retorna o usuário cujo ID foi informado no parametro
 *
**/
userRoutes.get("/user/:id", (req, res) => {
  try {

    // Obtém os parametros da requisição
    const { id } = req.params;

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
      FROM usuarios
    WHERE id = ${id}
    `;

    /* -------------------------------------------------------------------------- */

    // Obtém o usuário cujo id foi informado no parametro
    connection.query(sql, (err, results) => {

      if (err)
        return res.status(500).json({erro: err.message});

      if (results.length == 0)
        return res.status(500).json({erro: "Usuário não encontrado!"});

      return res.status(200).json(results[0]);
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

/**
 * @description
 * EndPoint responsável por inserir um novo usuário no banco de dados
 *
 * @author Lucas Metzker
 *
 * @returns Retorna uma mensagem de confirmação e o ID do usuário inserido
 *
**/
userRoutes.post("/user", (req, res) => {
  try {

    // Obtém os parametros da requisição
    const { nome, cargo, usuario, senha } = req.body;

    if (!nome)
      throw new Error("Nome não informado");

    /* -------------------------------------------------------------------------- */

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    INSERT
      INTO usuarios
        ( nome
        , cargo
        , usuario
        , senha
        , data
        )
    VALUES
        ( '${nome}'
        , '${cargo}'
        , '${usuario}'
        , '${senha}'
        , CURRENT_TIMESTAMP()
        )
    `;

    /* -------------------------------------------------------------------------- */

    // Insere um novo registro no banco de dados de acordo com os parametros informados
    connection.query(sql, [nome, usuario, cargo], (err, result) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json({
        message: "Usuário criado com sucesso!",
        id: result.insertId
      });
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

/**
 * @description
 * EndPoint responsável por atualizar um usuário no banco de dados
 *
 * @author Lucas Metzker
 *
 * @returns Retorna mensagem de confirmação e o ID do usuário atualizado
 *
**/
userRoutes.put("/user/:id", (req, res) => {
  try {

    // Obtém os parametros da requisição
    const { id } = req.params;
    const { nome, usuario, cargo } = req.body;

    if (!id)
      throw new Error("Id não informado");
    if (!nome)
      throw new Error("Nome não informado");
    if (!usuario)
      throw new Error("Usuario não informado");

    /* -------------------------------------------------------------------------- */

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql =
    `UPDATE usuarios
        SET nome    = '${nome}'
          , usuario = '${usuario}'
          , cargo   = '${cargo}'
      WHERE id = '${id}'
    `;

    // Atualiza as informações do usuário informado
    connection.query(sql, [nome, usuario, cargo, id], (err) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        id
      });
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

/**
 * @description
 * EndPoint responsável por remover um usuário do banco de dados
 *
 * @author Lucas Metzker
 *
 * @returns Retorna mensagem de confirmação e o ID do usuário removido
 *
**/
userRoutes.delete("/user/:id", async (req, res) => {
  try {

    // Obtém os parametros da requisição
    const { id } = req.params;

    /* -------------------------------------------------------------------------- */

    // Abre a conexão com o banco de dados
    const connection = Conexao();

    /* -------------------------------------------------------------------------- */

    // Comando que será executado no banco
    const sql = `
    DELETE
      FROM usuarios
    WHERE id = ${id}
    `;

    /* -------------------------------------------------------------------------- */

    // Remove o usuário do ID informado
    connection.query(sql, [id], (err) => {

      if (err)
        return res.status(500).json({erro: err.message});

      return res.status(200).json({
        message: "Usuário removido com sucesso!",
        id });
    });

  } catch (e) {
    return res.status(500).json({erro: e.message});
  }
});

module.exports = userRoutes;