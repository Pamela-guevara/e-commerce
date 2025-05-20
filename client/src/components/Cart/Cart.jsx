import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getLastOrder, borrarCarrito } from '../../redux/actions';
import axios from "axios";

import { 
  Paper,
  Container,
  Typography
} from "@material-ui/core/";

import ProductPapers from "./ProductPapers.jsx";

export default function ({ match }) {
  
  // HOOKS ----------------------------------------------------------
  const dispatch = useDispatch()
  const order = useSelector( state => state.cart_user );
  const user = useSelector( state => state.infoUser );
  const [axiosOrder, setAxiosOrder] = useState(true);
  const transfer = useSelector( state => state.cart_guest );

  // AXIOS FUNCTIONS ------------------------------------------------
  async function putNewQuantity(quantity, idProduct) {
    await axios.put("http://localhost:8080/carts/quantity/" + match.params.id, {
      idProduct,
      quantity
    });
    setAxiosOrder(true);
  }

  async function deleteAllProducts() {
    await axios.delete("http://localhost:8080/carts/" + match.params.id);
    dispatch(borrarCarrito());
    setAxiosOrder(true);
  }

  // HANDLERS -------------------------------------------------------
  function handleChangeQuantity(quantity, idProduct) {
    putNewQuantity(quantity, idProduct);
  }

  function handleRemoveAll() {
    deleteAllProducts();
  }

  // USE EFFECT -----------------------------------------------------
  useEffect(() => {
    if (axiosOrder) {
      dispatch(getLastOrder(match.params.id));
      setAxiosOrder(false)
    }
  }, [axiosOrder, dispatch, match.params.id, transfer, user.id] );

  return (
    <div>
      <br/>
      <Container maxWidth="md">
        <Paper variant="outlined">
          <Typography variant="h4">
            {( user === undefined ) ? "Bienvenido A Tu Carrito" : user.lastName + ", " + user.name}
          </Typography>
          <br/>
          <Typography variant="h6">
            {( user === undefined ) ? "Futuro Comprador" : user.mail}
          </Typography>
          <br/>
          <hr/>
          <br/>
          <Container>
            <ProductPapers products={order.products} handleChangeQuantity={handleChangeQuantity} handleRemoveAll={handleRemoveAll}/>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}
