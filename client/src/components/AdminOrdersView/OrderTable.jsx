import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import CustomizedMenus from './Actions.jsx'

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
  },
}));

export default function ProductTable({ orders = [] }) {
  
  // USE STYLES
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell align="center">Usuario</TableCell> */}
            <TableCell align="center">Orden</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Productos</TableCell>
            <TableCell align="center">Direccion</TableCell>
            <TableCell align="center">Precio total</TableCell>
            <TableCell align="center">Details</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.sort(function(a, b){return a.id-b.id}).map((order) => (
              <TableRow key={order.id}>
                {/* <TableCell align="center">Usuario</TableCell> */}
                <TableCell align="center">
                  <Link to={"/orders/" + order.id} style={{ textDecoration: 'none', color: 'darkBlue'}}>
                    N°{order.id}
                  </Link>
                </TableCell>
                <TableCell align="center">{order.status}</TableCell>
                <TableCell align="center">{
                  order.products.length > 0 ? (
                    <ul className={classes.list}>
                      {
                        order.products.map((product) => (
                          <li key={product.id}>
                            <Link to={"/products/" + product.id} style={{ textDecoration: 'none', color: 'black'}}>
                              {product.id} - {product.name}
                            </Link>
                          </li>
                        ))
                      } 
                    </ul>
                  ) : "No products"
                }</TableCell>
                <TableCell align="center">{order.address ? order.address : "-"}</TableCell>
                <TableCell align="center">{
                  order.products.reduce((acc, curr) => {
                    return acc + parseFloat(curr.order_product.sub_price);
                  }, 0)
                }</TableCell>
                <TableCell align="center">{order.details ? order.details : "-"}</TableCell>
                <TableCell align="center">
                  <CustomizedMenus id={order.id} status={order.status}/>
                </TableCell>
              </TableRow>
            ))
          ) : (
              <p>No orders</p>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
