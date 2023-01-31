import Category from './Category';

describe('Category Model', () => {
  let category: Category;
  it('should be able to create a new category object with as little information as possible', () => {
    category = new Category({
      name: 'category',
      description: 'description',
    });

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('createdAt');
    expect(category).toHaveProperty('updatedAt');
  });

  it('should be able to create a new category object with full information', () => {
    const newCategory = new Category({
      name: category.name,
      description: category.description,
      id: category.id,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });

    expect(newCategory).toMatchObject(category);
  });
});
