import Specification from './Specification';

describe('Specification Model', () => {
  let specification: Specification;
  it('should be able to create a new specification object with as little information as possible', () => {
    specification = new Specification({
      name: 'category',
      description: 'description',
    });

    expect(specification).toHaveProperty('id');
    expect(specification).toHaveProperty('createdAt');
    expect(specification).toHaveProperty('updatedAt');
  });

  it('should be able to create a new specification object with full information', () => {
    const newSpecification = new Specification({
      name: specification.name,
      description: specification.description,
      id: specification.id,
      createdAt: specification.createdAt,
      updatedAt: specification.updatedAt,
    });

    expect(newSpecification).toMatchObject(specification);
  });
});
