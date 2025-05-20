import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CRUD from "./components/CRUD/crud.jsx";
import NewCategory from "./components/NewCategory/NewCategory.jsx";
import Product from "./components/Product/Product.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Catalog from "./components/Catalog/catalog.jsx";
import Search from "./components/Catalog/searchCatalogo.jsx";
import NewUser from "./components/NewUser/NewUser";
import Login from "./components/Login/Login.jsx";
import Order from "./components/Order/Order.jsx";
import Orders from "./components/AdminOrdersView/OrderView.jsx";
import UsersView from "./components/AdminUsersView/UsersView.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Reviews from "./components/Product/Reviews/Reviews.jsx";
import LeaveReview from "./components/GiveReview/GiveReview.jsx";
import cart_guest from "./components/Carrito_invitado/cart_guest.jsx";
import { useBeforeunload } from 'react-beforeunload';
import { saveLocalStorage_guest, saveLocalStorage_user } from './redux/actions.js';
import Checkout from './components/Checkout/Checkout.jsx';
import Ending from './components/Checkout/finalizacion.jsx';
import CheckUser from './components/check/check.jsx';
import Reset from './components/Password/passwordReset.jsx';
import History from './components/History/History.jsx';

function App() {

  const user = useSelector(state => state.infoUser);
  const estado = useSelector( state => state );
  useBeforeunload(() => user === undefined ? saveLocalStorage_guest(JSON.stringify(estado)) : saveLocalStorage_user(JSON.stringify(estado)));

  return (
    <div className="App">
      <BrowserRouter>
        {/* Hay que solucionar lo relacionado a rutas enlazadas */}

        {/* Navegacion libre sin necesidad de usuario */}
        <Route path="/" component={SearchBar} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/" component={Catalog} />
        <Route exact path="/reviews" component={Reviews} />
        <Route exact path="/check/:id" component={CheckUser} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/history" component={History} />
    
        {
          !user ? (
            <React.Fragment>
              {/* Si no hay un usuario logueado lo siguiente se habilita */}
              <Route exact path="/register" component={NewUser} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart_guest" component={cart_guest}/>
            </React.Fragment>
          ) : (
            !user.isAdmin ? (
              <React.Fragment>
                {/* Si es un usuario simple puede acceder a su carro y su perfil */}
                <Route exact path="/:id/profile" component={Profile} />
                <Route exact path="/cart/:id" component={Cart} />
                <Route exact path="/leavereview/:id" component={LeaveReview} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/checkout/end" component={Ending} />
                <Route exact path="/orders/:id" component={Order} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Si es un usuario admin puede acceder a todas las funcionalidades */}
                <Route exact path="/:id/profile" component={Profile} />
                <Route exact path="/usersView" component={UsersView} />
                <Route exact path="/NewCategory" component={NewCategory} />
                <Route exact path="/CRUD" component={CRUD} />
                <Route exact path="/orders/:id" component={Order} />
                <Route exact path="/ordersView" component={Orders} />
              </React.Fragment>
            )
          )
        }
      </BrowserRouter>
    </div>
  );
}
export default App;
