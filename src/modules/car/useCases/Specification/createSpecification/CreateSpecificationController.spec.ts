import { appDataSource } from '@app/database';
import { createAdmin } from '@app/database/seed/admin';
import { app } from '@app/server';
import request from 'supertest';
import { DataSource } from 'typeorm';

let dataSource: DataSource;

describe('Create Specification Controller', () => {
  let token: string;
  beforeAll(async () => {
    dataSource = await appDataSource.initialize();
    await dataSource.runMigrations();
    await createAdmin(dataSource);

    const requestToken = await request(app).post('/session').send({
      email: 'admin@admin.com',
      password: '123456',
    });
    token = requestToken.body.token;
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it('should be able to create a new specification', async () => {
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

  it('should not be able to create a new specification with same name', async () => {
    const res = await request(app)
      .post('/specification')
      .send({
        name: 'supertest',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(res.status).toBe(400);
  });
});
