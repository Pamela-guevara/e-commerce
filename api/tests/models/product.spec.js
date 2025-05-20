const { Product, conn } = require('../../src/db.js');
const { expect } = require('chai');

const faker = require('faker');

const createOneRandomProduct = function() {
  return {
      name: faker.commerce.productName(),
      brand: faker.company.companyName(),
      description: faker.random.words(),
      price: faker.commerce.price(100),
      stock: faker.random.number(20)
  };
}

describe('User model', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('Validators', () => {
    let fakeProduct;
    beforeEach(() => Product.sync({ force: true }));
    beforeEach("Crear nuevo producto", () => {
      fakeProduct = createOneRandomProduct();
    });
    describe('name', () => {
      it('debe lanzar error si un campo es null', (done) => {
        Product.create({
        })
          .then(() => done(new Error('It requires a valid value')))
          .catch(() => done());
      });
      it('deberia funcionar si se le proveen todos los atributos', () => {
        Product.create(fakeProduct);
      });
    });
  });
});

