// src/server.ts
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import profileRoutes from "./routes/profile.routes";
import userRoutes from "./routes/user.routes";

const server = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler); // Validador de dados
server.setSerializerCompiler(serializerCompiler); // Dizer como serializar os dados

// Rotas login e cadastro
server.register(cors, {
  origin: "*", // Permite requisições do frontend
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify API",
      description: "Documentação da API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(userRoutes, { prefix: "/" }); // All rou
server.register(profileRoutes, { prefix: "/" }); // All rou

server.listen({ port: 3001 }).then(() => {
  console.log("Servidor rodando na porta 3001");
});
