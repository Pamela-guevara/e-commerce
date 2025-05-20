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

import SearchBar from './../../src/components/SearchBar/SearchBar.jsx';

describe('SearchBar - src/components/SearchBar/SearchBar.jsx', () => {
    let searchBarWrapper, onSearchSpy;
    beforeEach("Creating a Product wrapper", () => {
        onSearchSpy = spy();
        searchBarWrapper = shallow(<SearchBar onSearch={onSearchSpy}/>);
    });
    it("La funcion on search no se debe ejecutar inmediatamente", () => {
        expect(onSearchSpy).not.to.have.been.called;
    });
    
    xit("La funcion on search se debe ejecutar cuando se clickee en el boton, con el mismo value del input", () => {
        // aun no se clickeo
        expect(onSearchSpy).not.to.have.been.called;

        // simulando click
        searchBarWrapper.find('button').simulate('click');
        
        // producto a sido clickeado al menos una vez
        expect(onSearchSpy).to.have.been.called;

        // ToDo: agregar expect cuando se haga click obteniendo el value del input
    });
});