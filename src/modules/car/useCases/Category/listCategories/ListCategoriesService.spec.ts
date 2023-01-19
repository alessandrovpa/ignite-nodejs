import { InMemoryCategoryRepository } from '../../../repositories/inMemory/CategoryRepository';
import { CreateCategoryService } from '../createCategory/CreateCategoryService';
import { ListCategoriesService } from './ListCategoriesService';

const categoryProps = {
  name: 'category',
  description: 'a new category',
};

describe('List categories service', () => {
  it('should be able to list all categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const listCategoriesSerivce = new ListCategoriesService(categoryRepository);
    const createCategoryService = new CreateCategoryService(categoryRepository);

    let categories = await listCategoriesSerivce.execute();

    expect(categories).toHaveLength(0);

    await createCategoryService.execute({
      name: categoryProps.name,
      description: categoryProps.description,
    });
    await createCategoryService.execute({
      name: `${categoryProps.name} 2`,
      description: categoryProps.description,
    });

    categories = await listCategoriesSerivce.execute();

    expect(categories).toHaveLength(2);
  });
});
