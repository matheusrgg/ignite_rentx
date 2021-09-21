import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationsDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {


  private respository: Repository<Specification>

  constructor() {
    this.respository = getRepository(Specification)
  }


  async create({ description, name }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.respository.create({
      description,
      name
    })

    await this.respository.save(specification);
    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.respository.findOne({
      name,
    })
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.respository.findByIds(ids);
    return specification;
  }

}

export { SpecificationsRepository }