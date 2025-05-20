import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { v4 } from 'uuid';
import { getSearch } from '../../redux/actions.js';
const queryString = require("query-string");

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
export default function Album({ location }) {
  const classes = useStyles();

  // HOOKS --------------------------------------
  const productsSearch = useSelector(state => state.Search);
  const [buscar, setBuscar] = useState(true);
  var query = queryString.parse(location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (buscar) {
      if (query.keyWord.length !== 0) {
        dispatch(getSearch(query));
        setBuscar(false);
      }
    }   
  }, [query, dispatch, buscar]);

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
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid item xs={12}>
            <Grid container spacing={10} justify="center">
              { 
                productsSearch.map((product) => (
                <Grid key={v4()} item>
                  <ProductCard product={product} />
                </Grid>
                ))
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
