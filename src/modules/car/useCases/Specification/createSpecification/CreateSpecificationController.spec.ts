import { appDataSource } from '@app/database';
import { createAdmin } from '@app/database/seed/admin';
import { app } from '@app/server';
import request from 'supertest';
import { DataSource } from 'typeorm';

let dataSource: DataSource;

describe('Create Specification Controller', () => {
  beforeAll(async () => {
    dataSource = await appDataSource.initialize();
    await dataSource.runMigrations();
    await createAdmin(dataSource);
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it('should be able to create a new specification', async () => {
    const requestToken = await request(app).post('/session').send({
      email: 'admin@admin.com',
      password: '123456',
    });
    const { token } = requestToken.body;

    const res = await request(app)
      .post('/specification')
      .send({
        name: 'supertest',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(201);
  });
});
