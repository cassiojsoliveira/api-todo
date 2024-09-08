import { prisma } from "../libs/prisma";
import { User } from "../types/user";
import z from "zod";

// Função para criar um usuário.
export const createUser = async (reqBody: User) => {
  const { name, email, password } = reqBody;

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres." }),
    email: z.string().email({ message: "E-mail inválido." }),
    // password: z
    //   .string()
    //   .min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    //8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
        },
      ),
  });

  const result = schema.safeParse({ name, email, password });
  if (!result.success) {
    const error = result.error.issues.map((issue) => issue.message);
    return { error: error };
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return { data: `Usuário ${user.name} criado com sucesso!` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: "Usuário já cadastrado." };
      }
    }
  }
};

// Função para listar todos os usuários.
export const listUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!users) throw new Error("Nenhum usuário encontrado.");
    return users;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Erro ao buscar usuários." };
    }
  }
};

// Função para buscar um usuário pelo ID.
export const findUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        id,
      },
    });
    if (!user) throw new Error("Usuário não encontrado.");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Erro ao buscar usuário." };
    }
  }
};

// Função para atualizar um usuário.
// Precisa mandar id, name e email.
export const updateUser = async ({ value }: any) => {
  const id = Number(value.id);
  const { name, email } = value;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    return { data: `Usuário ${user.name} atualizado com sucesso!` };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Erro ao atualizar usuário." };
    }
  }
};

// Função para deletar um usuário.
export const deleteUser = async (id: number) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return { data: `Usuário ${user.name} deletado com sucesso!` };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Erro ao deletar usuário." };
    }
  }
};