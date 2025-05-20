import React from 'react';
import { postMailUser } from '../../redux/actions.js';
import { useSelector, useDispatch } from 'react-redux';


export default function Ending (){

    const dispatch = useDispatch();
    const user = useSelector( state => state.infoUser );
    const cart = useSelector( state => state.cart_user );

    function enviar_mail() {
        dispatch(postMailUser(cart.id, user.name, user.mail));
        alert('Gracias por tu compra')
    }

    setTimeout(enviar_mail(), 30000)

    return(
        <div>
            <h3>Su compra ha sido completada con éxito. Muchas gracias por elegirnos.Lo esperamos para su próxima compra.</h3>
        </div>
    )
};