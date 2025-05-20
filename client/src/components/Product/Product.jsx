import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducto, postProductoToCart, cargarFantasma, getReviews } from '../../redux/actions';
import Rating from "@material-ui/lab/Rating";

import Reviews from "./Reviews/Reviews.jsx";

import { v4 } from 'uuid';

import {
  ProductCard,
  ContenedorImg,
  ProductText,
  ProductPrice,
  ContPrecio,
  Precio,
  Boton,
  Descripcion,
  
} from "./styles";

import { Grid, Typography,  } from "@material-ui/core";

export default function ({ match }) {
  var idRoute = match.params.id;

  // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();

  const producto = useSelector((state) => state.producto);
  const user = useSelector((state) => state.infoUser);
  const [avg, setAvg] = useState(1);
  const [axiosOn, setaxiosOn] = useState(false);
  const reviews = useSelector((state) => state.review);

  if (!axiosOn) {
    dispatch(getProducto(idRoute));
    dispatch(getReviews(idRoute));
    setaxiosOn(true);
    let sum = 0;
    reviews.forEach((e) => {
      sum += parseInt(e.score);
    });
    let newAvg = sum / reviews.length;
    console.log(sum, newAvg);
    setAvg(newAvg);
  }

  return (
    <div>
    <ProductCard elevation={3}>
      <ContenedorImg src={producto.img} alt="imagen de producto" />
      <ProductText>
        {" "}
        <h1>{producto.name}</h1>
        <h4>{producto.brand}</h4>
        <Descripcion>{producto.description}</Descripcion>
        <p>Stock: {producto.stock}</p>
        <ProductPrice>
          <ContPrecio>
            <Precio>
              <h5>${producto.price}</h5>
            </Precio>
          </ContPrecio>
        </ProductPrice>
        {producto.stock > 0 ?
          <Boton onClick={() => {
            ( user === undefined ) ? dispatch(cargarFantasma(producto))
          :
            dispatch(postProductoToCart( user.id , idRoute))}}>Agregar al carrito</Boton>
          : 
          <Boton>SIN STOCK</Boton>}
      </ProductText>
    </ProductCard>
    <div>
        <Typography gutterBottom variant="h5" component="h5">
          Opiniones sobre el producto
        </Typography>
        <Rating name="read-only" value={avg} readOnly="true" />

        <Grid container spacing={10} justify="center">
          {reviews.map((e) => (
            <Grid key={v4()} item>
              <Reviews review={e} />
            </Grid>
          ))}
          
        </Grid>
      </div>
    </div>
  );
}
