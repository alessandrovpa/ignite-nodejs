import Specification from "../models/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Specification;
  list(): Specification[];
  findByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
