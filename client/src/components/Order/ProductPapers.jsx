import React from "react";

import {
  Paper,
  Typography,
  makeStyles,
  Grid
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "12px",
  }
}));

export default function ({ products = [] }) {

  // USE STYLES
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      {products.length > 0 ? (
        products.map((product) => (
          <Paper className={classes.paper} variant="outlined">
            <Grid container direction="row"  justify="space-between">
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
                <br/>
                <Grid container direction="row">
                  <Grid item xs={4}>
                    Tipologia: {product.typology}
                  </Grid>
                  <Grid item xs={4}>
                    Tamaño: {product.size}
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
      <Typography variant="h6" align="right">
        Total: {products.reduce((acc, curr) => {
          return acc + parseFloat(curr.order_product.sub_price);
        }, 0)}
      </Typography>
    </Paper>
  );
}
