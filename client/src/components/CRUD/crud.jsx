import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, getCategories, postProducto, putProducto, deleteProducto } from '../../redux/actions';
import ProductTable from './productTable.jsx';
import {
  Grid,
  Button,
  makeStyles,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Link
} from "@material-ui/core";

const initialFormState = {
  id: "no assigned",
  name: '',
  description: '',
  price: 0.0,
  stock: 0,
  brand: '',
  typology: '',
  colors: '',
  size: ''
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputFile: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  heroContent: {
    backgroundColor: theme.palette.background.black,
    padding: theme.spacing(6, 0, 0),
  },
}));

export default function CRUD() {

  const dispatch = useDispatch()
  // USE STYLES
  const classes = useStyles();

  // HOOKS --------------------------------------
  const products = useSelector(state => state.Products);
  const [axiosEffect, setAxiosEffect] = useState(true);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(initialFormState);
  const categories = useSelector(state => state.Categories);

  // HANDLERS -----------------------------------
  function handleOnSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    const data = new FormData(form);

    if (edit) {
      dispatch(putProducto(current.id, current.categories[0].id, data));
      setEdit(false);
      setCurrent(initialFormState);
    } else {
      dispatch(postProducto(data));
      setCurrent(initialFormState);
    }

  }

  function handleOnChange(event) {
    const { name, value } = event.target;

    setCurrent({
      ...current,
      [name]: value
    });
  }

  function handleOnEdit(product) {
    setCurrent(product);
    setEdit(true);
  }

  function handleOnReset() {
    setCurrent(initialFormState);
    setEdit(false);
  }

  function handleOnDelete(id) {
    dispatch(deleteProducto(id))
  }

  // USEEFFECT ----------------------------------
  useEffect(() => {
    if (axiosEffect) {
      dispatch(getData());
      dispatch(getCategories());
      setAxiosEffect(false);
    }
  }, [axiosEffect, dispatch]);

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
            Formulario de carga
          </Typography>
        </Container>
      </div>
      <div className={classes.root}>
        <form id="form" onSubmit={(event) => handleOnSubmit(event)}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Nombre</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    onChange={handleOnChange}
                    value={current.name}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Descripcion</InputLabel>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Descripcion"
                    onChange={handleOnChange}
                    value={current.description}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Marca</InputLabel>
                  <Input
                    id="brand"
                    name="brand"
                    type="text"
                    placeholder="Marca"
                    onChange={handleOnChange}
                    value={current.brand}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Tipologia</InputLabel>
                  <Input
                    id="typology"
                    name="typology"
                    type="text"
                    placeholder="Tipologia"
                    onChange={handleOnChange}
                    value={current.typology}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Colores</InputLabel>
                  <Input
                    id="colors"
                    name="colors"
                    type="text"
                    placeholder="Colores"
                    onChange={handleOnChange}
                    value={current.colors}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="categories">Categorias</InputLabel>
                  <Select
                    className={classes.selectEmpty}
                    name="categories"
                    id="categories"
                    required
                  >
                    {categories.map((e) => (
                      <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Tamaño</InputLabel>
                  <Input
                    id="size"
                    name="size"
                    type="text"
                    placeholder="Tamaño"
                    onChange={handleOnChange}
                    value={current.size}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={1}>
              <Container>
                <FormControl>
                  <InputLabel>Stock</InputLabel>
                  <Input
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder="Stock"
                    onChange={handleOnChange}
                    value={current.stock}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={1}>
              <Container>
                <FormControl>
                  <InputLabel>Price</InputLabel>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Precio"
                    onChange={handleOnChange}
                    value={current.price}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
          </Grid>
          <br />
          {
            categories.length <= 0 ? (
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4}>
                  <Container>
                    <Button
                    size="small"
                    color="primary"
                    >
                      <Link href="/NewCategory">
                        Cargar categorias
                      </Link>
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            ) : (
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={4}>
                  <Container>
                    <Input type="file" id="img" name="img" onChange={handleOnChange} />
                  </Container>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    size="small"
                    color="primary"
                    type="submit"
                  >
                    {edit ? "Editar" : "Cargar"}
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    size="small"
                    type="reset"
                    onClick={() => handleOnReset()}
                    color="primary"
                  >
                    Limpiar
                  </Button>
                </Grid>
              </Grid>
            )
          }
          
        </form>
      </div>
      <br />
      <br />
      <div>
        <ProductTable products={products} editProduct={handleOnEdit} removeProduct={handleOnDelete} />
      </div>
    </div>
  )
};