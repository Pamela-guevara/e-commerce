import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderTable from './OrderTable.jsx';
import FilterCheckbox from './Filters.jsx';
import { getOrdersAdmin } from '../../redux/actions.js'



export default function() {

  // HOOKS --------------------------------------
  const orders = useSelector( state => state.Orders_table )
  const [axiosOrders, setAxiosOrders] = useState(true);

  // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();

  // HANDLERS

  // USE EFFECT
  useEffect(() => {
    if (axiosOrders) {
      dispatch(getOrdersAdmin());
      setAxiosOrders(false);
    }
  }, [axiosOrders, dispatch]);

  return (
    <div>
      <FilterCheckbox />
      <OrderTable orders={orders} />
    </div>
  )
};