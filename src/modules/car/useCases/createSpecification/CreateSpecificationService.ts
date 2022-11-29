import Specification from "../../models/Specification";
import { SpecificationRepository } from "../../repositories/SpecificationRepository";

interface ICreateSpecificationService {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: SpecificationRepository) {}

  public execute({
    name,
    description,
  }: ICreateSpecificationService): Specification {
    if (!name || !description) {
      throw new Error("Preencha todos os campos!");
    }
    const verifySpecificationAlreadyExist =
      this.specificationRepository.findByName(name);
    if (verifySpecificationAlreadyExist) {
      throw new Error("Especificação já cadastrada!");
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationService };
