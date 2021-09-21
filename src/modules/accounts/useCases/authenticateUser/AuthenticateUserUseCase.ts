import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";




interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}







@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Usuario existente
    const user = await this.usersRepository.findByEmail(email);


    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    //senha está correta
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = sign({}, "7697bf58e5a63d82d368d72ccd0bef8f", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return tokenReturn;


  }
}

export { AuthenticateUserUseCase }