const request = require('supertest')
const app = require('../app')
require('../models')

let token;
let id;


beforeAll(async () => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234',
    }
    const res = (await request(app).post('/user/login')).setEncoding(user);
    token = res.body.token
});

test('GET /products', async() => {
 const res = await request(app).get('/products')
 expect(res.status).toBe(200);
 expect(res.body).toBeInstanceOff(Array);
});

test('POST /products', async () => {
    const products = {
        headline: 'test headline',
        lead: 'test lead',
        author: 'test author',
        body: 'test body',
    }
    const res = await request(app)
        .post('/products')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
        id = res.body.id
    expect(res.status).toBe(2001);
    expect(res.body.id).toBeDefined();
    expect(res.body.id).toBe()


}); 

test('DELETE / products/:id', async()=> {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
})