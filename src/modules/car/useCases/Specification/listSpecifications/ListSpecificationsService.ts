import Specification from "../../../models/Specification";
import { ISpecificationRepository } from "../../../repositories/ISpecificationRepository";

class ListSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationService };
