import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import faker from 'faker';

import Product from './../../src/components/Product/Product.jsx';

const createOneRandomProducts = function() {
    return {
        id: faker.random.number(),
        name: faker.commerce.productName(),
        brand: faker.company.companyName(),
        description: faker.random.words(),
        price: faker.commerce.price(100),
        stock: faker.random.number(20),
        review: faker.random.number(5.0)
    };
}

describe('ProductCard - src/components/ProductCard/ProductCard.jsx', () => {
    let productWrapper, fakeProduct, addToCartSpy;
    beforeEach("Creating a Product wrapper", () => {
        addToCartSpy = spy();
        fakeProduct = createOneRandomProducts();
        productWrapper = shallow(<Product fullProduct={fakeProduct} addToCart={addToCartSpy}/>);
    });
    xit("La funcion para navegar al producto no se debe ejecutar inmediatamente", () => {
        
    });
});