import { NextFunction, Request, Response } from 'express';
import { RegisterDto } from '../models/dto/register.dto';
import { validate } from 'class-validator';

export class UserMiddleware {
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { nombre, codigo, email, password, telefono } = req.body;

    const valid = new RegisterDto();

    valid.nombre = nombre;
    valid.codigo = codigo;
    valid.email = email;
    valid.password = password;
    valid.telefono = telefono;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return res.status(400).json({
          message: err,
        });
      } else {
        next();
      }
    });
  }
}
