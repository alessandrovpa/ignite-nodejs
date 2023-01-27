import Specification from '@car/models/Specification';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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

    const existSpecification = await this.specificationRepository.findByName(
      name
    );
    if (existSpecification) {
      throw new AppError('Especificação já cadastrada!');
    }

    const specification = new Specification({
      name,
      description,
    });

    await this.specificationRepository.save(specification);

    return specification;
  }
}

export { CreateSpecificationService };
