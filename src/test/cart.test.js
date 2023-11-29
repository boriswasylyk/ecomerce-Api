const request = require('supertest');
const app = require('./app'); 
const assert = require('assert');

let id;
let token;

beforeAll(async () => {
  const user = {
      email: 'test@gmail.com',
      password: 'test1234',
  };
  const res = await request(app).post('/user/login').send(user);
  token = res.body.token; 
});



  it('GET /cart should return 200', async () => {
    const response = await request(app).get('/cart')
    .set('Authorization', `bearer ${token}`);
    expect(res.tatus).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  });

  it('POST /cart should return 201', async () => {
    const body = {
      quantity: "test5",
    }
    const response = await request(app).post('/cart').send({body})
    .set('Authorization', `bearer ${token}`);

    id = res.body.id
    expect(res.status).toBe(2001);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(body);
  });

  

  it('PUT /cart/:id should return 200', async () => {
    const body = {
      quiantity: "test 6 ",
    }
    const response = await request(app).put(`/cart/:id`).send({ body })
    .set('Authorization', `bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body)
  });

  it('DELETE /cart/:id should return 204', async () => {
    const response = await request(app).delete(`/cart/${id}`)
    .set('Authorization', `bearer ${token}`);

    expect(res.status).toBe(204)
  });
