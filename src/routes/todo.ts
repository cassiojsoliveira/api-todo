import {
  createUser,
  deleteUser,
  findUserById,
  listUsers,
  updateUser,
} from "./../models/user";
import express, { Request } from "express";

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
export default todoRouter;

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
