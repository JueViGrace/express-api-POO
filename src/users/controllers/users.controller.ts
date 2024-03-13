import { NextFunction, Request, Response } from "express";
import usersService from "../services/users.service";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await usersService.getUsers());
  } catch (error: any) {
    console.error("Error while fetching users", error.message);
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await usersService.getUserById(req.params.userId));
  } catch (error: any) {
    console.error(`Error while fetching user ${req.params.id}`, error.message);
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await usersService.createUser(req.body));
  } catch (error: any) {
    console.error("Error creating user", error.message);
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await usersService.updateUser(req.params.userId, req.body));
  } catch (error: any) {
    console.error(`Error updating user ${req.params.id}`, error.message);
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await usersService.deleteUser(req.params.userId));
  } catch (error: any) {
    console.error(`Error deleting user ${req.params.id}`, error.message);
    next(error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
