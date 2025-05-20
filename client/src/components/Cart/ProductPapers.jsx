import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { putUserOrder_precio } from '../../redux/actions.js';

import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "12px",
  }
}));

export default function ({ products = [], handleChangeQuantity, handleRemoveAll }) {

  // USE STYLES
  const classes = useStyles();

  var total = products.reduce((acc, curr) => {
    return acc + parseFloat(curr.order_product.sub_price);
  }, 0)

  const dispatch = useDispatch();
  const cart_info = useSelector( state => state.cart_user );
  const datos = {
    total_price: total
  }

  return (
    <Paper elevation={0} className={classes.paper}>
      {products.length > 0 ? (
        products.map((product) => (
          <Paper className={classes.paper} variant="outlined">
            <Grid container direction="row" justify="space-between">
              <Grid item align="left" xs={8}>
                <Typography variant="h5">
                  {product.name} - {product.brand}
                </Typography>
                <p>
                  {product.description}
                </p>
                <Grid container direction="row">
                  <Grid item xs={4}>
                    Color: {product.colors}
                  </Grid>
                  <Grid item xs={4}>
                    Tamaño: {product.size}
                  </Grid>
                </Grid>
                <br />
                <Grid container direction="row">
                  <Grid item xs={4}>
                    Tipologia: {product.typology}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} align="right">
                <Grid container direction="column" justify="space-between">
                  <Grid item>
                    <Typography variant="h6">
                      ${product.price}
                    </Typography>
                    <p>
                      Cantidad: {product.order_product.quantity}
                    </p>
                  </Grid>
                  <Grid container direction="row" justify="flex-end">
                    <Grid item>
                      <Button color="primary" variant="outlined" onClick={() => handleChangeQuantity(product.order_product.quantity - 1, product.id)}>
                        -
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button color="primary" variant="outlined" onClick={() => handleChangeQuantity(product.order_product.quantity + 1, product.id)}>
                        +
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      ${product.order_product.sub_price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
          <div>
            <p>No products</p>
          </div>
        )}
      <br />
      {
        products <= 0 ? "" : (
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Button color="secondary" variant="outlined" onClick={() => handleRemoveAll()}>
                Vaciar carro
            </Button>
            </Grid>
            <Grid item>
              <Link to={'/checkout'} style={{ textDecoration: 'none', color: 'black' }}>
                <Button color="primary" variant="outlined" onClick={() => dispatch(putUserOrder_precio(cart_info.id, datos))}>
                  CONTINÚA TU COMPRA
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Total: {products.reduce((acc, curr) => {
                return acc + parseFloat(curr.order_product.sub_price);
              }, 0)}
              </Typography>
            </Grid>
          </Grid>
        )
      }
    </Paper>
  );
}
