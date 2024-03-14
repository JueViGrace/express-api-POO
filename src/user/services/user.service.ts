import { User } from '../models/user.entity';

const getUsers = async (): Promise<User[]> => {
  const user = await User.find();

  return user;
};

const getUserById = async (id: string) => {
  return;
};

const createUser = async (body: any) => {
  return;
};

const updateUser = async (id: string, body: any) => {
  return;
};

const deleteUser = async (id: string) => {
  return;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
