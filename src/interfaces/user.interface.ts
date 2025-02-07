// src/interfaces/user.interface.ts
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profile_completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
