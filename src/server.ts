import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import router from "./routes";
import todoRouter from "./routes/todo";

dotenv.config();

const port = process.env.PORT;

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "public")));

server.use("/todo", todoRouter);
server.use("/", router);

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
