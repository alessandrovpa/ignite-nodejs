import Specification from '@car/models/Specification';
import { ISpecificationRepository } from '@car/repositories/ISpecificationRepository';
import { appDataSource } from '@database/index';
import { In, Repository } from 'typeorm';

import TypeOrmSpecification from '../entities/Specification';
import { SpecificationMapper } from '../mapper/SpecificationMapper';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<TypeOrmSpecification>;

  constructor() {
    this.repository = appDataSource.getRepository(TypeOrmSpecification);
  }

  async save(specification: Specification): Promise<void> {
    await this.repository.save(SpecificationMapper.toTypeORM(specification));
  }

  async saveMany(specifications: Specification[]): Promise<void> {
    const typeOrmSpecifications: TypeOrmSpecification[] = [];
    specifications.forEach((specification) => {
      typeOrmSpecifications.push(SpecificationMapper.toTypeORM(specification));
    });

    await this.repository.save(typeOrmSpecifications);
  }

  async list(): Promise<Specification[]> {
    const specifications: Specification[] = [];

    const typeOrmSpecifications = await this.repository.find();
    typeOrmSpecifications.forEach((specification) => {
      specifications.push(SpecificationMapper.toModel(specification));
    });

    return specifications;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();
    if (!specification) return null;

    return SpecificationMapper.toModel(specification);
  }

  async findById(id: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ id });
    if (!specification) return null;

    return SpecificationMapper.toModel(specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications: Specification[] = [];

    const typeOrmSpecifications = await this.repository.findBy({ id: In(ids) });
    typeOrmSpecifications.forEach((specification) => {
      specifications.push(SpecificationMapper.toModel(specification));
    });

    return specifications;
  }
}

export { SpecificationRepository };
