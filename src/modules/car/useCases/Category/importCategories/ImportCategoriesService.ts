import { parse } from "csv-parse";
import * as fs from "fs";

import Category from "../../../models/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

interface ICategory {
  name: string;
  description: string;
}

interface IResponseDTO {
  categories: ICategory[];
  newCategoriesCount: number;
  repeatedOrEmptyCategoriesCount: number;
}

class ImportCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}

  private loadCategories(file: Express.Multer.File): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: ICategory[] = [];

      const parsedFile = parse();

      stream.pipe(parsedFile);

      parsedFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<IResponseDTO> {
    const newCategories: Category[] = [];
    const categories = await this.loadCategories(file);

    const filteredAvaiableCategories = categories
      .filter((category) => !!category.description)
      .filter((category) => !!category.name)
      .filter(
        async (category) => !this.categoryRepository.findByName(category.name)
      );

    // eslint-disable-next-line no-restricted-syntax
    for (const category of filteredAvaiableCategories) {
      const { name, description } = category;
      // eslint-disable-next-line no-await-in-loop
      const newCategory = await this.categoryRepository.create({
        name,
        description,
      });
      console.log(newCategory);
      newCategories.push(newCategory);
    }

    const newCategoriesCount = newCategories.length;
    const repeatedOrEmptyCategoriesCount =
      categories.length - filteredAvaiableCategories.length;

    return {
      categories: newCategories,
      newCategoriesCount,
      repeatedOrEmptyCategoriesCount,
    };
  }
}

export { ImportCategoriesService };
