import prisma from "../database/prisma-client";
import { Profile } from "../interfaces/profile.interface";

export const createProfile = async (profileData: Omit<Profile, "id">) => {
  try {
    await prisma.profile.create({ data: profileData });
    await prisma.user.update({
      where: { id: profileData.userId },
      data: { profile_completed: true },
    });
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllProfiles = async (): Promise<Profile[]> => {
  return prisma.profile.findMany();
};

export const getProfileById = async (id: string): Promise<Profile | null> => {
  return prisma.profile.findUnique({ where: { id } });
};

export const getProfileByUserId = async (
  userId: string
): Promise<Profile | null> => {
  return prisma.profile.findFirst({ where: { userId } });
};

export const getProfileByEmail = async (
  email: string
): Promise<Profile | null> => {
  return prisma.profile.findFirst({ where: { email } });
};

export const getProfileByUsername = async (
  username: string
): Promise<Profile | null> => {
  return prisma.profile.findFirst({ where: { username } });
};

export const updateProfile = async (
  id: string,
  profileData: Partial<Profile>
) => {
  return prisma.profile.update({ where: { id }, data: profileData });
};
