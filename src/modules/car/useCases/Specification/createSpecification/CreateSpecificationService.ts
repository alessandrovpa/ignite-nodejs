import Specification from "../../../models/Specification";
import { ISpecificationRepository } from "../../../repositories/ISpecificationRepository";

interface ICreateSpecificationService {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  public execute({
    name,
    description,
  }: ICreateSpecificationService): Specification {
    if (!name || !description) {
      throw new Error("Preencha todos os campos!");
    }
    const existeSpecification = this.specificationRepository.findByName(name);
    if (existeSpecification) {
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
