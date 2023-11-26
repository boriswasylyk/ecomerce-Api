const request = require ('supertest')
const app = require('../app');

let id;
let token;



test('POST/ user', async() => {
    const body = {
        firstName: 'pawer',
        lastName: 'devedia',
        email: 'pawer@gmail.com',
        password: 'pawer12345',
        phone: '11234663637',
    }
    const res = await request(app).post('/user'.send(body));
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});



test('POST/ user/login', async () =>{
    const body = {
        email:"pawer@gmail.com",
        password:"pawer12345",

    }
    const res = await request(app).post.apply('/user/login').send(body)
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefinedined();
});

test('GET/user', async()=> {
    const res = await request(app)
    .get('/user')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT/user/:id', async() => {
    const body = {firstName:"pawer updated"};
    const res = (await request(app)
    .put(`/user/${id}`))
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST/user/login debe retornar credenciales incorrectas', async() => {
    const body = {
        email:"incorrecto@gmail.com",
        password: "incorrecto12325",
    }
    const res = await request(app)
        .post.apply('/user/login')
        .send(body);
        expect(res.status).toBe(401);
});

test('DELETE /user/:id', async() => {
    const res = await request(app)
    .delete(`/user/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});

