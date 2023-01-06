/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '10 - 15',
  weight: '4 - 6',
  lifespan: '8 - 12',
};
const dog2 = {
  name: 'Timon',
  height: '9 - 14',
  weight: '3 - 5',
  lifespan: '10 - 14',
};

describe('GET /dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() =>{ 
      Dog.create(dog)
      Dog.create(dog2)
    }));
  describe('GET /dogs', () => {
    it('should get status 200 and the list of all dogs', () =>
      agent.get('/dogs').expect(200)
    );
    it('should get status 200 if dog id is valid', () =>
      agent.get('/dogs/1').expect(200)
    )
    it('should get status 404 if dog id is invalid', () =>
      agent.get('/dogs/280').expect(404)
    )
    it('should get status 200 if query name is valid', () =>
      agent.get('/dogs?name=Timon').expect(200)
  )
    it('should get status 404 if query name is invalid', () =>
      agent.get('/dogs?name=Carlos').expect(404)
    )
  });
});

describe('POST /dogs route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
});

