import { InMemorySpecificationRepository } from '../../../repositories/inMemory/SpecificationRepository';
import { CreateSpecificationService } from '../createSpecification/CreateSpecificationService';
import { ListSpecificationService } from './ListSpecificationsService';

describe('List Specification Service', () => {
  it('should be able to list all specifications', async () => {
    const specificationRepository = new InMemorySpecificationRepository();
    const listSpecificationService = new ListSpecificationService(
      specificationRepository
    );
    const createSpecificationService = new CreateSpecificationService(
      specificationRepository
    );

    let specifications = await listSpecificationService.execute();

    expect(specifications).toHaveLength(0);

    await createSpecificationService.execute({
      name: 'specification',
      description: 'description',
    });

    specifications = await listSpecificationService.execute();

    expect(specifications).toHaveLength(1);
  });
});
