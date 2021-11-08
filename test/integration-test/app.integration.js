require('dotenv').config();
const mongoose = require('mongoose');
const supertest = require('supertest');
beforeEach((done) => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => done());
});
afterEach((done) => {
  mongoose.connection.close(() => done());
});
const app = require('../../app');
const routePath = '/api/v1/records';
test(`POST ${routePath} route: to fetch data with the given criterias`, async () => {
  const requestPayload = {
    startDate: '2016-01-26',
    endDate: '2018-02-02',
    minCount: 2700,
    maxCount: 3000,
  };
  await supertest(app)
    .post(routePath)
    .send(requestPayload)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.lenth).not.toBe(0);
    })
    .catch((err) => { throw err });
});
test(`POST ${routePath} route: throw validation error in case of the absence of startDate property`, async () => {
  const requestPayload = {
    endDate: '2018-02-02',
    minCount: 2700,
    maxCount: 3000,
  };
  await supertest(app)
    .post(routePath)
    .send(requestPayload)
    .then((res) => {
      expect(res.statusCode).toBe(400);
    })
    .catch((err) => {
        throw err;
    });
});
test(`POST ${routePath} route: throw validation error in case of the absence of endData property`, async () => {
    const requestPayload = {
      startDate: '2018-02-02',
      minCount: 2700,
      maxCount: 3000,
    };
    await supertest(app)
      .post(routePath)
      .send(requestPayload)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      })
      .catch((err) => {
          throw err;
      });
});

test(`POST ${routePath} route: throw validation error in case of the absence of minCount property`, async () => {
    const requestPayload = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      maxCount: 3000,
    };
    await supertest(app)
      .post(routePath)
      .send(requestPayload)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      })
      .catch((err) => {
          throw err;
      });
});

test(`POST ${routePath} route: throw validation error in case of the absence of maxCount property`, async () => {
    const requestPayload = {
      startDate: '2016-01-26',
      endDate: '2018-02-02',
      minCount: 2700,
    };
    await supertest(app)
      .post(routePath)
      .send(requestPayload)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      })
      .catch((err) => {
          throw err;
      });
});

test(`GET * route: throw not found error since the route does not exist`, async () => {
    await supertest(app)
      .get('/')
      .then((res) => {
        expect(res.statusCode).toBe(404);
      })
      .catch((err) => {
          throw err;
      });
});

test(`GET /dummy-path route: throw not found error since the route does not exist`, async () => {
    await supertest(app)
      .get('/')
      .then((res) => {
        expect(res.statusCode).toBe(404);
      })
      .catch((err) => {
          throw err;
      });
});