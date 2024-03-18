import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '../../shared/response/http.response';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/entities/user.entity';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getUsers(_req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();

      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'Users not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'User not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async getUserWithRelation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserWithRelation(id);

      if (!data) {
        return this.httpResponse.NotFound(res, 'User not found');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body,
      );

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to update user');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, 'Failed to delete user');
      }

      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}
