import { Profile } from "@prisma/client";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  getProfileByUsername,
  updateProfile,
} from "../repositories/profile.repository";

export const listProfiles = async () => {
  return getAllProfiles();
};

export const registerProfile = async ({
  data,
}: {
  data: Omit<Profile, "id">;
}) => {
  return createProfile(data);
};

export const editProfile = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Profile>;
}) => {
  return updateProfile(id, data);
};

export const listProfileById = async (id: string) => {
  return getProfileById(id);
};

export const listProfileByUserId = async (userId: string) => {
  return getProfileByUserId(userId);
};

export const listProfileByUsername = async (username: string) => {
  return getProfileByUsername(username);
};
