import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postProductoToCart } from '../../redux/actions';


const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

export default function ({ product }) {
  const { img, brand, name, description, id, stock } = product;
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(state => state.infoUser);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Img producto"
            height="140"
            image={img}
          />
          <CardMedia src={img} alt="imagen de producto" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              {brand}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {stock > 0 ?
          <Button size="small" color="primary" onClick={()=>dispatch(postProductoToCart(user.id, id))}>
            Agregar al carrito
          </Button>
          :
          <Button size="small" color="primary" disabled>
            SIN STOCK
          </Button>
          }
          <Button size="small" color="primary">
            <Link to={"/products/" + product.id} style={{ textDecoration: 'none', color: 'Grey' }}>
              Ver más
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  
  );
}
