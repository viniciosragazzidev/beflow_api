import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_super_secreto";

// Criando um tipo personalizado para FastifyRequest que inclui a propriedade 'user'
interface AuthenticatedRequest extends FastifyRequest {
  user?: { id: string };
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  reply: FastifyReply
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return reply.status(401).send({ message: "Token não encontrado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded || !decoded.userId) {
      return reply.status(401).send({ message: "Token inválido" });
    }

    req.user = { id: decoded.userId }; // Definindo o ID do usuário na requisição
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
}
