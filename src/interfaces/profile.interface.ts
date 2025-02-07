export interface Profile {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  dateOfBirth: Date;
  interestsTags: string[];

  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
