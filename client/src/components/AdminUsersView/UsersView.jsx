import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "././UsersTable.jsx";
import {
  Grid,
  Button,
  makeStyles,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Container,
  Switch
} from "@material-ui/core";


const initialFormState = {
  id: "no assigned",
  name: "",
  mail: "",
  lastName: "",
  password: "",
  isAdmin: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputFile: {
    display: "none",
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
    textAlign: "center",
  },
  heroContent: {
    backgroundColor: theme.palette.background.black,
    padding: theme.spacing(6, 0, 0),
  },
}));

export default function UsersView() {
  // USE STYLES
  const classes = useStyles();

  // HOOKS --------------------------------------
  const [users, setusers] = useState([]);
  const [axiosEffect, setAxiosEffect] = useState(true);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(initialFormState);

  // AXIOS FUNCTION -----------------------------
  async function getAllusers() {
    const results = await axios.get("http://localhost:8080/users/");
    setusers(results.data);
    setAxiosEffect(false);
  }

  async function postuser() {
    await axios.post("http://localhost:8080/users/", {
      name: current.name,
      lastName: current.lastName,
      mail: current.mail,
      password: current.password
    });
    setAxiosEffect(true);
    setCurrent(initialFormState);
  }

  async function putuser() {
    await axios.put("http://localhost:8080/users/" + current.id, {
      name: current.name,
      lastName: current.lastName,
      mail: current.mail,
      isAdmin: current.isAdmin
    });
    setAxiosEffect(true);
    setEdit(false);
    setCurrent(initialFormState);
  }

  async function deleteuser(id) {
    await axios.delete("http://localhost:8080/users/" + id);
    setAxiosEffect(true);
    setEdit(false);
    setCurrent(initialFormState);
  }

  // HANDLERS -----------------------------------
  function handleOnSubmit(event) {
    event.preventDefault();

    if (edit) {
      putuser();
    } else {
      postuser();
    }
  }

  function handleOnChange(event) {
    const { name, value } = event.target;

    setCurrent({
      ...current,
      [name]: value,
      
    });
  }
  function handleOnCheck(){
    if(!current.isAdmin){
      setCurrent({
        ...current,
        isAdmin: true
      })
    } else {
      setCurrent({
        ...current,
        isAdmin: false
      })
    }
  };

  function handleOnEdit(user) {
    setCurrent(user);
    setEdit(true);
  }

  function handleOnReset() {
    setCurrent(initialFormState);
    setEdit(false);
  }

  function handleOnDelete(id) {
    deleteuser(id);
  }

  // USEEFFECT ----------------------------------
  useEffect(() => {
    if (axiosEffect) {
      getAllusers();
    }
  }, [axiosEffect]);

  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Usuarios
          </Typography>
        </Container>
      </div>
      <div className={classes.root}>
        <form id="form" onSubmit={(event) => handleOnSubmit(event)}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2}>
              <Container>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <Input
                    id="mail"
                    name="mail"
                    type="text"
                    placeholder="Email"
                    onChange={handleOnChange}
                    value={current.mail}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
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
                  <InputLabel>Apellido</InputLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Apellido"
                    onChange={handleOnChange}
                    value={current.lastName}
                    required
                  />
                </FormControl>
              </Container>
            </Grid>
            <Grid item xs={2}>
            <FormGroup row>
              <Container>
                <FormControlLabel
                  control={
                    <Switch
                      checked={current.isAdmin}
                      onChange={handleOnCheck}
                      name="isAdmin"
                      color="primary"
                    />
                  }
                  label="IsAdmin"
                />
              </Container>
              </FormGroup>
            </Grid>
          </Grid>

          <br />
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={2}>
              <Button size="small" color="primary" type="submit">
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
        </form>
      </div>
      <br />
      <br />
      <div>
        <UsersTable
          users={users}
          edituser={handleOnEdit}
          removeuser={handleOnDelete}
        />
      </div>
    </div>
  );
}
