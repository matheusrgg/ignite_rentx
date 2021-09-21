import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { RepositoryNotTreeError } from "typeorm";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(
    request.user
  );
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
