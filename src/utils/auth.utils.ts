import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Deve ser armazenado em uma variável de ambiente

export const generateJWT = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" }); // O token expira em 1 hora
};
