import { appDataSource } from '@app/database';
import { createAdmin } from '@app/database/seed/admin';
import { app } from '@app/server';
import request from 'supertest';
import { DataSource } from 'typeorm';

let dataSource: DataSource;

describe('List Specification Controller', () => {
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

  it('should be able to list all specifications', async () => {
    let res = await request(app).get('/specification');
    expect(res.body).toHaveLength(0);

    await request(app)
      .post('/specification')
      .send({
        name: 'supertest',
        description: 'description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    res = await request(app).get('/specification');
    expect(res.body).toHaveLength(1);
  });
});
