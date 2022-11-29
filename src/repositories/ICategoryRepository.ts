import { Category } from "../models/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Category;
  list(): Category[];
  findByName(name: string): Category;
}

export default ICategoryRepository;
