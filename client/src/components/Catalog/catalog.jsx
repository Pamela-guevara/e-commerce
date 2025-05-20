import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ProductCard from "../ProductCard/ProductCard.jsx";
import FilterCheckbox from "./Filter.jsx";
import { useEffect } from "react";
import { v4 } from 'uuid';
import { getData, getCategories } from '../../redux/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        e-commerce
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.black,
    padding: theme.spacing(6, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  CardActions: {
    align: "center",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

// Usa la props 'location' que recibe desde el Route
export default function Album() {
  const classes = useStyles();

  // HOOKS --------------------------------------
  const productos = useSelector(state => state.Products)
  const dispatch = useDispatch()

  // El siguiente hooks muestra los productos filtrados
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [axiosCategories, setAxiosCategories] = useState(true);
  const categories = useSelector(state => state.Categories)
  const showFilters = useSelector( state => state.Filters);
  
  useEffect(() => {
    if (axiosCategories) {
      dispatch(getData());
      dispatch(getCategories());
      setAxiosCategories(false)
    };
  }, [dispatch, axiosCategories]);

  const handleChangeFilters = (filters) => {
    let filtersOn = filters.find((e) => e.check);

    // Si no se filtra se muestran todos
    if (!filtersOn) {
      setProductosFiltrados(productos);
    } else {
      let newFiltereds = [];
      
      for (let i = 0; i < productos.length; i++) {
        
        for (let j = 0; j < filters.length; j++) {
          if(productos[i].categories[0].name === filters[j].name && filters[j].check) {
            newFiltereds.push(productos[i]);
          }
        }
        
      }

      setProductosFiltrados(newFiltereds);
    }

  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Catalogo
            </Typography>
          </Container>
        </div>
        {
          showFilters ? (
            <React.Fragment>
              <FilterCheckbox
                categories={categories}
                handleChangeFilters={(filters) => handleChangeFilters(filters)}
              />
            </React.Fragment>
            ) : (
            <React.Fragment>
            </React.Fragment>
            )
        }
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid item xs={12}>
            <Grid container spacing={10} justify="center">
              { 
                productosFiltrados.length === 0 ? (

                  productos.map((product) => (
                  <Grid key={v4()} item>
                    <ProductCard product={product} />
                  </Grid>
                ))
                ) : (
                  productosFiltrados.map((product) => (
                  <Grid key={v4()} item>
                    <ProductCard product={product} />
                  </Grid>
                )))

              }
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          E-COMMERCE
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Todos los derehos reservados.
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
