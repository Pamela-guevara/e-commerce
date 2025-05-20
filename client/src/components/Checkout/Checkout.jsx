import React, { useState } from 'react';
import CardMethod from './cardMethod.jsx';
import CashMethod from './cashMethod.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { putUserOrder_checkout, putUserOrder_status, borrarCarrito } from '../../redux/actions.js';
import { useHistory } from 'react-router-dom';
import {
    Grid,
    FormGroup,
    FormControlLabel,
    Container,
    Switch
} from "@material-ui/core";

const Checkout = () => {
    //------INITIAL STATE----------------------------------------------------
    const initialState = {
        street: '',
        number: '',
        city: '',
        province: '',
        details: '',
        cash: true
    }
    //------HOOKS------------------------------------------------------------
    const [checkout, setCheckout] = useState(initialState);
    var informacion = useSelector( state => state.cart_user );
    const dispatch = useDispatch();
    const history = useHistory();

    //------HANDLERS----------------------------------------------------------
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCheckout({
            ...checkout,
            [name]: value
        });
    };

    function handleOnCheck() {
        if (!checkout.cash) {
            setCheckout({
                ...checkout,
                cash: true
            })
        } else {
            setCheckout({
                ...checkout,
                cash: false
            })
        }
    };

    const handleOnSubmit = (e, id, data, userId) => {
        e.preventDefault();
        dispatch(putUserOrder_checkout(id, data));
        dispatch(putUserOrder_status(id, 'creada', userId));
        dispatch(borrarCarrito());
        setCheckout(initialState);
        history.push("/checkout/end");
        console.log('se submiteo')
        alert('se submiteo')
    };

    return (

        <form id='pay' onSubmit={(e) => {handleOnSubmit( e, informacion.id, checkout, informacion.userId )}}>
            <div>
                <h3>Ingresa la dirección donde quieres recibir tu compra</h3>
                <input type="text"
                    name='street'
                    value={checkout.street}
                    placeholder="Calle"
                    onChange={handleOnChange} 
                    required/>
                <input type="text"
                    name='number'
                    value={checkout.number}
                    placeholder="Número"
                    onChange={handleOnChange} 
                    required/>
                <input type="text"
                    name='city'
                    value={checkout.city}
                    placeholder="Localidad"
                    onChange={handleOnChange} 
                    required/>
                <input type="text"
                    name='province'
                    value={checkout.province}
                    placeholder="Provincia"
                    onChange={handleOnChange} 
                    required/>
            </div>
            <div>
                <label htmlFor="consideraciones">Notas</label>
                <input type="text"
                    name='details'
                    value={checkout.details}
                    placeholder="Máximo 255 caracteres"
                    maxLength="255"
                    onChange={handleOnChange} />
            </div>
            <Grid item xs={2}>
                <FormGroup row>
                    <Container>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checkout.cash}
                                    onChange={handleOnCheck}
                                    name="cash"
                                    color="primary"
                                />
                            }
                            label="Efectivo/Tarjeta"
                        />
                    </Container>
                </FormGroup>
            </Grid>
            <div>
                {
                    checkout.cash ?
                        <CashMethod total_price={informacion.total_price} onSubmit={(e) => {handleOnSubmit(e)}}/>
                        :
                        <CardMethod total_price={informacion.total_price} onSubmit={(e) => {handleOnSubmit(e)}}/>
                }
            </div>
        </form>
    )
};
export default Checkout;