import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app'; 

describe('Category E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new category', async () => {
    const categoryData = { name: 'Electronics' };
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send(categoryData)
      .expect(201);

    expect(response.body.name).toEqual('Electronics');
  });

  it('should get all categories', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a single category by id', async () => {
    const categoryId = 1;
    const response = await request(app.getHttpServer())
      .get(`/categories/${categoryId}`)
      .expect(200);

    expect(response.body).toHaveProperty('name');
  });

  it('should update a category by id', async () => {
    const categoryId = 1;
    const updateData = { name: 'Updated Category' };
    const response = await request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toEqual('Updated Category');
  });

  it('should delete a category by id', async () => {
    const categoryId = 1;
    await request(app.getHttpServer())
      .delete(`/categories/${categoryId}`)
      .expect(204);
  });
});
