import Specification from '@car/models/Specification';

import { ISpecificationRepository } from '../ISpecificationRepository';

class InMemorySpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async save(specification: Specification): Promise<void> {
    this.specifications.push(specification);
  }

  async saveMany(specifications: Specification[]): Promise<void> {
    specifications.forEach((specification) => {
      this.specifications.push(specification);
    });
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    if (!specification) return null;
    return specification;
  }

  async findById(id: string): Promise<Specification | null> {
    const specification = this.specifications.find(
      (specification) => specification.id === id
    );
    if (!specification) return null;
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export { InMemorySpecificationRepository };
