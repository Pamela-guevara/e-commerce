import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getHistory } from '../../redux/actions';
import HistoryTable from './HistoryTable.jsx';
import {
  Typography
} from "@material-ui/core";

export default function() {
  // HOOKS Y SELECTORS
  const { id } = useSelector( state => state.infoUser );
  const history = useSelector( state => state.userHistory );
  const [axiosOrders, setAxiosOrders] = useState(true);

  // DISPATCH
  const dispatch = useDispatch();

  // USE EFFECT
  useEffect(() => {
    if (axiosOrders) {
      dispatch(getHistory(id));
      setAxiosOrders(false);
    }
  }, [axiosOrders, dispatch, id]);

  return (
    <div>
      <Typography variant="h4">
        Timeline
      </Typography>
      <HistoryTable history={history}/>
    </div>
  );
}