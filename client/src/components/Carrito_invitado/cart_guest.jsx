import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { borrarFantasma } from '../../redux/actions';

import { 
  Paper,
  Container,
  Typography
} from "@material-ui/core/";

import Vista from "./vista.jsx";

export default function () {
  
  // HOOKS ----------------------------------------------------------
  const dispatch = useDispatch()
  const order = useSelector( state => state.cart_guest );
  const user = useSelector( state => state.infoUser );
  console.log(order)

  // HANDLERS -------------------------------------------------------

  function handleRemoveAll() {
    dispatch(borrarFantasma())
  }

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
            <Vista products={order} handleRemoveAll={handleRemoveAll}/>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}
