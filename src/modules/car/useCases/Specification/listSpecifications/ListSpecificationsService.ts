import { inject, injectable } from "tsyringe";

import Specification from "../../../models/Specification";
import { ISpecificationRepository } from "../../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationService {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationService };
