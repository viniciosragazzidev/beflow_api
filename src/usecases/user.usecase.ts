// src/usecases/user.usecase.ts
import bcrypt from "bcryptjs";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
} from "../repositories/user.repository";

export const listUsers = async () => {
  return getAllUsers();
};

export const listUserById = async (id: string) => {
  return getUserById(id);
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ name, email, password: hashedPassword });
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  return user;
};
