import LocalSpecification from '@car/models/Specification';
import { appDataSource } from '@database/index';

import Specification from '../entities/Specification';

class SpecificationMapper {
  static toTypeORM(specification: LocalSpecification): Specification {
    const specificationRepository = appDataSource.getRepository(Specification);
    return specificationRepository.create({
      id: specification.id,
      name: specification.name,
      description: specification.description,
      createdAt: specification.createdAt,
      updatedAt: specification.updatedAt,
    });
  }

  static toModel(specification: Specification): LocalSpecification {
    return new LocalSpecification({
      id: specification.id,
      name: specification.name,
      description: specification.description,
      createdAt: specification.createdAt,
      updatedAt: specification.updatedAt,
    });
  }
}

export { SpecificationMapper };
