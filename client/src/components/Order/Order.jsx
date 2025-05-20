import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderUser } from '../../redux/actions';

import { 
  Paper,
  Container,
  Typography
} from "@material-ui/core/";

import ProductPapers from "./ProductPapers.jsx";

export default function ({ match }) {
  const order = useSelector( state => state.info_cart_user_products );
  const user = useSelector( state => state.info_cart_user );
  const [axiosOrder, setAxiosOrder] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    if (axiosOrder) {
      dispatch(getOrderUser(match.params.id))
      setAxiosOrder(false)
    }
  }, [axiosOrder, dispatch, match.params.id] );

  return (
    <div>
      <br/>
      <Container maxWidth="md">
        <Paper variant="outlined">
          <Typography variant="h4">
            {user.lastName + ", " + user.name}
          </Typography>
          <br/>
          <Typography variant="h6">
            {user.mail}
          </Typography>
          <br/>
          <hr/>
          <br/>
          <Container>
            <ProductPapers products={order.products}/>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}
