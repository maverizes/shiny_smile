import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app';

describe('Product E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Smartphone',
      description: 'A new smartphone',
      price: 50000,
      category_id: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/products/add')  // Check if this URL matches your controller
      .send(productData)
      .expect(201);

    expect(response.body.name).toEqual('Smartphone');
    expect(response.body.category_id).toEqual(1);
  });

  it('should get all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')  // Make sure this URL matches your controller
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a single product by id', async () => {
    const productId = 1;  // Replace with actual product id
    const response = await request(app.getHttpServer())
      .get(`/products/${productId}`)  // Make sure this URL matches your controller
      .expect(200);

    expect(response.body).toHaveProperty('name');
  });

  it('should update a product by id', async () => {
    const productId = 1;  // Replace with actual product id
    const updateData = {
      name: 'Updated Smartphone',
      price: 55000,
    };

    const response = await request(app.getHttpServer())
      .patch(`/products/update/${productId}`)  // Make sure this URL matches your controller
      .send(updateData)
      .expect(200);

    expect(response.body.name).toEqual('Updated Smartphone');
    expect(response.body.price).toEqual(55000);
  });

  it('should delete a product by id', async () => {
    const productId = 1;  // Replace with actual product id
    await request(app.getHttpServer())
      .delete(`/products/delete/${productId}`)  // Make sure this URL matches your controller
      .expect(204);
  });
});
