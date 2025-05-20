import React, { useState, useEffect } from "react";
import CategoriesTable from "./CategoriesTable";
import { useSelector, useDispatch } from 'react-redux';
import { editar, getCategories, postCategories, deleteCategories, putCategories } from '../../redux/actions';
import {
  Grid,
  Button,
  makeStyles,
  Typography,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";

// INITIAL STATES
const initialState = {
  id: "no assigned",
  name: "",
  description: "",
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    flexGrow: 1,
  },
  fields: {
    marginTop: "30px",
    flexGrow: 1,
  },
  button: {
    marginTop: "20px",
    marginBottom: "30px"
  },
}));

export default function () {
  // STYLES
  const classes = useStyle();

  // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();

  // HOOKS
  const categories = useSelector(state => state.Categories);
  const edit = useSelector(state => state.Edit);
  const [category, setCategory] = useState(initialState);
  const [axiosCategories, setAxiosCategories] = useState(true);

  // HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      dispatch(putCategories(category.id, category));
      setCategory(initialState);
    } else {
      dispatch(postCategories(category));
      setCategory(initialState);
    }
  };

  const handleOnDelete = (id) => {
    dispatch(deleteCategories(id));
  }

  const handleOnEdit = (category) => {
    setCategory(category);
    dispatch(editar())
  }

  // USEEFFECTS
  useEffect(() => {
    if (axiosCategories) {
      dispatch(getCategories())
      setAxiosCategories(false);
    }
  }, [axiosCategories, dispatch]);

  return (
    <div>
      <form
        className={classes.root}
        onSubmit={handleOnSubmit}
        id="formCategory"
      >
        <div>
          <br />
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {edit ? "Modificar" : "Agregar"} categoría
        </Typography>
        </div>
        <Grid
          className={classes.fields}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <FormControl>
              <InputLabel>Nombre</InputLabel>
              <Input
                id="name"
                type="text"
                aria-describedby="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <InputLabel>Descripcion</InputLabel>
              <Input
                id="description"
                type="text"
                aria-describedby="text"
                name="description"
                value={category.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <Button
              size="small"
              variant="outlined"
              type="submit"
              value="Crear"
              className={classes.button}
            >
              {edit ? "Editar" : "Crear"}
          </Button>
          </Grid>
        </Grid>
      </form>

      <CategoriesTable categories={categories} deleteCategory={handleOnDelete} editCategory={handleOnEdit}/>
    </div>

  );
}