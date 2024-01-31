const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token; 

beforeAll(async()=> {
    const credentials = {
        email: 'test@gmail.com',
        password: '1505',
    }
    const res = (await request(app).post('/users/login').send(credentials));
    token = res.body.token; 
});

test('GET/products', async()=> {
    const res= await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ products', async()=> {
    const product = {
        title: 'iPhone 11',
        description: 'Smarth phone',
        brand: 'Apple',
        price: 2.000000,
    }
    const res = await request(app)
    .post('/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(product.name);
});
test('PUT/products/:id', async()=> {
    const product = {
        title: 'iphone actualizado',
        description: 'Smarth phone',
        brand: 'Apple',
        price: 2.000000,
    }
    const res = await request(app).put(`/products/${id}`)
    .send(product)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(product.name);
})

test("DELETE/products/:id elimina un product", async()=> {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});