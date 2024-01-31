const request = require('supertest');
const app = require('../app');

let id;
let token;

//hook que se ejecuta antes de todos los test 
beforeAll(async()=> {
    const credentials = {
        email: 'test@gmail.com',
        password: '1505',
    }
    const res = (await request(app).post('/users/login').send(credentials));
    token = res.body.token; 
});


test("GET/categories debe traer todas las categorias", async ()=> {
    const res = await request(app)
    .get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST/categories debe crear los usuarios", async()=> {
    const newCategory = {
    name: "smarth tv"
    }
    const res= await request(app)
    .post('/categories')
    .send(newCategory)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCategory.name);
});


test("PUT/categories/:id debe actualizar una categoria", async()=> {
    const category= {
        name: "Smarth tv actualizado"
    }
    const res = await request(app).put(`/categories/${id}`)
    .send(category)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test("DELETE/categories/:id elimina una categoria", async()=> {
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
