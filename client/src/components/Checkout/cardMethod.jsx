import React from 'react';

export default function CardMethod(props) {
    
    return (
        <div>
            <label>Ingrese su numero de tarjeta</label>
            <input type="text" placeholder="1234 5678 0000 1111" required maxLength='16' minLength='16'/>
            <label>Vencimiento</label>
            <input type="text" placeholder="MM/AA" required maxLength='5' minLength='5'/>
            <label>Código de seguridad</label>
            <input type="text" placeholder="999" required maxLength='3' minLength='3' />
            <br />
            <h5>Total a pagar: </h5>
            <h6>$ {props.total_price}</h6>
            <br/>
            <button type="submit" onSubmit={props.onSubmit}>Completar compra</button>
        </div>
    )
};