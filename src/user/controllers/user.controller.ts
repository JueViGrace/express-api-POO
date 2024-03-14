import { Request, Response } from 'express';

export class UserController {
  getUsers(req: Request, res: Response) {
    res.status(200).json({
      user: 'Daniel',
    });
  }
}

// import { Request, Response } from 'express';
// import usersService from '../services/user.service';

// const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await usersService.getUsers();

//     if (users.length === 0) {
//       return res.status(404).json({ message: 'Users not found', status: 404 });
//     }

//     res.json(users);
//   } catch (error: any) {
//     console.error('Error while fetching users', error.message);
//   }
// };

// const getUserById = async (req: Request, res: Response) => {
//   try {
//     res.json(await usersService.getUserById(req.params.userId));
//   } catch (error: any) {
//     console.error(`Error while fetching user ${req.params.id}`, error.message);
//   }
// };

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const newUser = await usersService.createUser(req.body);

//     res.json(newUser);
//   } catch (error: any) {
//     console.error('Error creating user', error.message);
//   }
// };

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     res.json(await usersService.updateUser(req.params.userId, req.body));
//   } catch (error: any) {
//     console.error(`Error updating user ${req.params.id}`, error.message);
//   }
// };

// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     res.json(await usersService.deleteUser(req.params.userId));
//   } catch (error: any) {
//     console.error(`Error deleting user ${req.params.id}`, error.message);
//   }
// };

// export default {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// };
