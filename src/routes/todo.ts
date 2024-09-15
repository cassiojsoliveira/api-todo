import express, { Request, Response } from "express";
import {
  createTarefa,
  createUser,
  deleteUser,
  findUserById,
  listTarefas,
  listUsers,
  listTodasTarefas,
  updateUser,
  updateTarefa,
  deleteTarefa,
} from "./../models/user";
import { send } from "process";

const todoRouter = express.Router();

// POST - Cadastrar usuário.
todoRouter.post("/cadastrar", async (req, res) => {
  const requestBody = req.body;
  const user = await createUser(requestBody);
  res.send(user);
});

// GET - Listar todos os usuários.
todoRouter.get("/usuarios", async (req, res) => {
  const users = await listUsers();
  res.send(users);
});

// GET - Buscar usuário pelo ID.
todoRouter.get("/usuario", async (req, res) => {
  const { id } = req.query;
  const user = await findUserById(Number(id));
  res.send(user);
});

// PATCH - Atualizar usuário.
todoRouter.patch("/attusuario", async (req, res) => {
  const value = await req.body;
  const attUser = await updateUser({ value });
  res.send({ attUser });
});

// DELETE - Deletar usuário.
todoRouter.delete("/deleteusuario", async (req, res) => {
  const { id } = req.body;
  const user = await deleteUser(Number(id));
  res.send(user);
});

// POST - CRIAR TAREFA
todoRouter.post("/criartarefa", async (req, res) => {
  const tarefa = await createTarefa(req.body);
  res.send({ tarefa });
});

export default todoRouter;

// GET - LISTAR TODAS AS TAREFAS
todoRouter.get("/tarefas", async (req, res) => {
  const tarefas = await listTodasTarefas();
  res.send({ tarefas });
});

// GET - LISTAR TAREFAS DE UM USUÁRIO
todoRouter.get("/usuariotarefas", async (req, res) => {
  const { id } = req.query;
  const tarefas = await listTarefas(Number(id));
  res.send({ tarefas });
});

// PATCH - ATUALIZAR TAREFA
todoRouter.patch("/atttarefa", async (req, res) => {
  const value = await req.body;
  const attTarefa = await updateTarefa(value);
  res.send({ attTarefa });
});

// DELETE - DELETAR UMA TAREFA
todoRouter.delete("/deletetarefa", async (req, res) => {
  const id = Number(req.query.id);
  const deleteTar = await deleteTarefa(id);
  res.status(200).send(deleteTar);
});
