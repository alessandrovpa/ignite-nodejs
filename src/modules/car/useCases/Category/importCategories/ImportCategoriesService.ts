import { parse } from "csv-parse";
import * as fs from "fs";

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
    const categories = await this.loadCategories(file);

    const filteredAvaiableCategories = categories
      .filter((category) => !!category.description)
      .filter((category) => !!category.name)
      .filter((category) => !this.categoryRepository.findByName(category.name));

    filteredAvaiableCategories.map((category) => {
      const { name, description } = category;

      this.categoryRepository.create({ name, description });
    });

    const newCategoriesCount = filteredAvaiableCategories.length;
    const repeatedOrEmptyCategoriesCount =
      categories.length - filteredAvaiableCategories.length;

    return {
      categories: filteredAvaiableCategories,
      newCategoriesCount,
      repeatedOrEmptyCategoriesCount,
    };
  }
}

export { ImportCategoriesService };
