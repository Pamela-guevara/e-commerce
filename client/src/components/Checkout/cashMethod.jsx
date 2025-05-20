import React from 'react';

export default function CashMethod(props) {
    return (
        <div>
            <h3>Método de pago: </h3>
            <h5>Efectivo</h5>
            <h5>Total a pagar: </h5>
            <h6>$ {props.total_price}</h6>
            <br/>
            <button type="submit" onSubmit={props.onSubmit}>Completar compra</button>
        </div>
    )
};

