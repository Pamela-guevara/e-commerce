import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logInUser } from '../../redux/actions';
import { useHistory, Link } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography
} from "@material-ui/core";
import LinkM from "@material-ui/core/Link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'

// INITIAL STATE
const initialState = {
  mail: "",
  password: "",
};

export default function Login() {
  // HOOKS
  const fail = useSelector(state => state.fail);
  const [Login, setLogin] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector( state => state.cart_guest );

  //HANDLERS

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...Login,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(Login, products));
    if(!fail) {
      setLogin(initialState);
      history.push("/");
    } else {
      alert("Usuario / Constraseña Incorrecta")
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} id="formNewUser">
        <Grid container style={{ minHeight: "100vh" }}>
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
                  name="mail"
                  value={Login.mail}
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
                  value={Login.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <br />
              <Grid item>
                <Button variant="outlined" type="submit">
                  Ingresar
                </Button>
                {/* Linkear al componente de /reset */}
                <Link to='/reset'>
                <Button variant="outlined" type="submit">
                  olvidé la constraseÑa
                </Button>
                </Link>
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
