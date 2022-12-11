import { parse } from "csv-parse";
import * as fs from "fs";
import { inject, injectable } from "tsyringe";

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

@injectable()
class ImportCategoriesService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

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

    // eslint-disable-next-line no-restricted-syntax
    for (const category of categories) {
      const { name, description } = category;
      if (name && description) {
        const verifyCategoryAlreadiExist =
          // eslint-disable-next-line no-await-in-loop
          await this.categoryRepository.findByName(name);
        if (!verifyCategoryAlreadiExist) {
          const newCategory = this.categoryRepository.create({
            name,
            description,
          });
          newCategories.push(newCategory);
        }
      }
    }

    await this.categoryRepository.saveMany(newCategories);

    const repeatedOrEmptyCategoriesCount =
      categories.length - newCategories.length;

    return {
      categories: newCategories,
      newCategoriesCount: newCategories.length,
      repeatedOrEmptyCategoriesCount,
    };
  }
}

export { ImportCategoriesService };
