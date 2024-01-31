const request = require('supertest');
const app = require('../app');

let id;
let token;

test("POST/users debe crear los usuarios", async()=> {
    const newUser = {
    firstName: "Valentina",
    lastName: "Cuellar",
    email: "valentina2@gmail.com",
    password: "1505",
    phone: "321463748"
    }
    const res= await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST/users/login ', async() => {
    const credentials = {
        email: "valentina2@gmail.com",
        password: "1505",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
});

test('POST/users/login con credenciales incorrectas', async () => { 
    const credentials = {
        email: "incorrecto@gmail.com",
        password: "incorrecto",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
    expect(res.status).toBe(401);
 });

test("GET/users debe traer todos los usuarios", async ()=> {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("GET/users/:id debe traer un usuario por id", async ()=> {
    const res = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
});

test("PUT/users/:id debe actualizar un usuario", async()=> {
    const user= {
        firstName: "Valentina Actualizado"
    }
    const res = await request(app).put(`/users/${id}`).send(user).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(user.name);
});

test("DELETE/users/:id elimina un usuario", async()=> {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});