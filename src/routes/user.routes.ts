// src/routes/user.routes.ts
import { FastifyRequest } from "fastify";
import { z } from "zod";
import { User } from "../interfaces/user.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FastifyTypeInstance } from "../types";
import {
  listUserById,
  listUsers,
  loginUser,
  registerUser,
} from "../usecases/user.usecase";
import { generateJWT } from "../utils/auth.utils";

export default async function userRoutes(fastify: FastifyTypeInstance) {
  fastify.get(
    "/users",
    {
      schema: {
        description: "List all users",
        tags: ["users"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const users = await listUsers();
      reply.send(users);
    }
  );

  fastify.get("/user", { preHandler: authMiddleware }, async (req, reply) => {
    try {
      const userId = req.user?.id || ""; // Pegando o ID do usuário autenticado
      const data = await listUserById(userId);
      if (!data) {
        reply.status(404).send({ message: "User not found" });
        return;
      }
      const user: Omit<User, "password"> | null = {
        id: data.id,
        name: data.name,
        email: data.email,
        profile_completed: data.profile_completed,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
      return { user }; // Aqui você pode buscar mais informações do usuário no banco
    } catch (error) {
      reply.status(500).send({ message: "Internal server error" });
      return;
    }
  });

  fastify.post(
    "/register",
    {
      schema: {
        description: "Register a new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;
      const user = await registerUser(name, email, password);
      reply.status(201).send(user);
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest<{ Body: User }>, reply) => {
      const { email, password } = request.body;

      try {
        const user = await loginUser(email, password);
        const token = generateJWT(user.id);
        reply.status(200).send({ token });
      } catch (error) {
        reply.status(401).send({ message: "Unauthorized" + error.message });
      }
    }
  );
}
