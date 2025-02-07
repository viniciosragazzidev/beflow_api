// src/repositories/user.repository.ts
import bcrypt from "bcryptjs";
import prisma from "../database/prisma-client";
import { User } from "../interfaces/user.interface";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};
export const createUser = async (userData: Omit<User, "id">) => {
  return prisma.user.create({ data: userData });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};
