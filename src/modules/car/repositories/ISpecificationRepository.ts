import Specification from '../models/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  save(specification: Specification): Promise<void>;
  saveMany(specifications: Specification[]): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification | null>;
  findById(id: string): Promise<Specification | null>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
