import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe';

import Specification from '../../../models/Specification';
import { ISpecificationRepository } from '../../../repositories/ISpecificationRepository';

interface ICreateSpecificationService {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationService {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({
    name,
    description,
  }: ICreateSpecificationService): Promise<Specification> {
    if (!name || !description) {
      throw new AppError('Preencha todos os campos!');
    }
    const existeSpecification = await this.specificationRepository.findByName(
      name
    );
    if (existeSpecification) {
      throw new AppError('Especificação já cadastrada!');
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationService };
