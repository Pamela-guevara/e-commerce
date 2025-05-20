import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, postNewUser } from '../../redux/actions';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import LinkM from "@material-ui/core/Link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'

import {
  Alert,
  AlertTitle,
} from "@material-ui/lab";

// INITIAL STATE
const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

export default function NewUser() {

  const dispatch = useDispatch();
  const history = useHistory();

  // HOOKS
  
  const [newUser, setNewUser] = useState(initialState);
  const allowPost = useSelector(state => state.NoexisteUsuario);
  const transfer = useSelector( state => state.cart_guest );
  
  //HANDLERS

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewUser(newUser, transfer));
    setNewUser(initialState);
    alert('Usuario creado exitosamente')
    history.push("/")
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} id="formNewUser">
        <Grid container style={{ minHeight: "450px" }}>
          <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 400,
                minWidth: 300,
              }}
            >
              <Grid container justify="center">
                <img src="./img/login.png" width={200} alt="loginImg" />
              </Grid>
              <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                  id="mail"
                  type="mail"
                  aria-describedby="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  onBlur={(event) => dispatch(getUserId(event.target.value))}
                  required
                />
              </FormControl>
              {
                allowPost ? (<React.Fragment></React.Fragment>) : (
                  <Alert severity="warning">
                    <AlertTitle>Email no disponible</AlertTitle>
                    Por favor intente con otro
                  </Alert>
                )
              }
              <FormControl>
                <InputLabel>Nombre</InputLabel>
                <Input
                  id="name"
                  type="text"
                  aria-describedby="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel>Apellido</InputLabel>
                <Input
                  id="lastName"
                  type="text"
                  aria-describedby="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  aria-describedby="text"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <br />
              <Grid item>
                {
                  allowPost ? (
                    <Button variant="outlined" type="submit">
                      Crear Cuenta
                    </Button>
                  ) : (
                      <Link to={"/login"} style={{ textDecoration: 'none', color: 'Grey' }}>
                        <Button variant="outlined" type="submit">
                          Ingresar
                        </Button>
                      </Link>
                    )
                }
              </Grid>
            </div>
            <div />
            <div />
          </Grid>
        </Grid>
      </form>
      <Typography>
        Ó ingresar con
      </Typography>
      <Typography variant="h3" color="primary">
        <LinkM href={'http://localhost:8080/auth/github'}>
          <FontAwesomeIcon icon={faGithubSquare} />
        </LinkM>
        <span> </span>
        <LinkM href={'http://localhost:8080/auth/google'}>
          <FontAwesomeIcon icon={faGooglePlusG}/>
        </LinkM>
      </Typography>
    </div>
  );
}
