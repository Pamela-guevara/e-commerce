import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

import {
  Button,
  makeStyles,
  Typography,
  Container,
  TextField
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
        heroContent: {
          backgroundColor: theme.palette.background.black,
          padding: theme.spacing(6, 0, 0),
        },
      }));


export default function Reset() {

  const initialState = {
    mail: '',
    currentPassword: '',
    confirmPassword: ''
  }

  const classes = useStyles();
  const [password, setPassword] = useState(initialState);
  const history = useHistory();



  const handleOnChange = (e) => {
    const {name, value} = e.target
    setPassword({
      ...password, 
      [name]: value
    })
  }

  const handleOnReset = (e) =>{
     e.preventDefault();
     putNewPassword();
     setPassword(initialState);
     alert('Contraseña reestablecida');
     history.push('/login');
  };

  async function putNewPassword(){
    const result = await axios.put("http://localhost:8080/users/reset",{
      mail: password.mail,
      currentPassword: password.currentPassword,
      confirmPassword: password.confirmPassword
    })
    console.log('llego al post de axios', result)
  };

    return(
        <div>
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
             <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
            Resetear contraseña
             </Typography>
             </Container>
             </div>
             <TextField required id="standard-required" label="Mail" onChange = {handleOnChange} name='mail' value={password.mailmail} />
        <TextField
          id="standard-password-input"
          label="Contraseña nueva"
          type="password"
          autoComplete="current-password"
          onChange = {handleOnChange} name='currentPassword' value={password.currentPassword}
        />
        <br></br>
        <TextField
          id="standard-password-input"
          label="Repetir contraseña"
          type="password"
          autoComplete="current-password"
          onChange = {handleOnChange} name='confirmPassword' value={password.confirmPassword}
        />
        <div>
        <Button onClick={handleOnReset}>Actualizar</Button>
        </div>
        </div>
    );
}