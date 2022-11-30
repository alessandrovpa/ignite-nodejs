import { parse } from "csv-parse";
import * as fs from "fs";

import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

interface ICategory {
  name: string;
  description: string;
}

interface IResponseDTO {
  categories: ICategory[];
  newCategories: number;
  repeatedOrEmptyCategories: number;
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
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<IResponseDTO> {
    const categories = await this.loadCategories(file);

    const filteredAvaiableCategories = categories
      .filter((category) => !this.categoryRepository.findByName(category.name))
      .filter((category) => !!category.name)
      .filter((category) => !!category.description);

    filteredAvaiableCategories.map((category) => {
      const { name, description } = category;

      this.categoryRepository.create({ name, description });
    });

    const newCategories = filteredAvaiableCategories.length;
    const repeatedOrEmptyCategories =
      categories.length - filteredAvaiableCategories.length;

    return {
      categories: filteredAvaiableCategories,
      newCategories,
      repeatedOrEmptyCategories,
    };
  }
}

export { ImportCategoriesService };
