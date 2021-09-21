import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
"tsyringe"



interface IRequest {
  name: string,
  description: string
}
// SOLID - a) Single Responsability Principle
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }
  // constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    console.log("cade ", categoryAlreadyExists)
    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists !")
    }

    await this.categoriesRepository.create({ name, description });

  }
}

export { CreateCategoryUseCase }