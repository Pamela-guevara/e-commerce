import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInUser_Auth } from '../../redux/actions.js';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function({ match }) {
    var idUser = match.params.id

    const dispatch = useDispatch();
    const history = useHistory();

    const carrito = useSelector( state => state.cart_guest );

    function redirigir() {
        dispatch(logInUser_Auth(idUser, carrito)); 
        history.push('/')
    }
   
    setTimeout(redirigir(), 20 * 1000);

    return (
        <div>
            <LinearProgress />
        </div>
    )
}