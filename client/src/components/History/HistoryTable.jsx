import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { v4 } from "uuid";
import { makeStyles } from '@material-ui/core/';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
  },
}));

export default function({history = []}) {

  // USE STYLES
  const classes = useStyles();

  console.log(history);

  return (
    <TableContainer component={Paper}>
      <Table arria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Orden</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Productos</TableCell>
            <TableCell align="center">Direccion</TableCell>
            <TableCell align="center">Precio total</TableCell>
            <TableCell align="center">Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            history.length < 1 ? (
              <TableRow>
                No hay ordenes
              </TableRow>
            ) : (
              <React.Fragment>
                {
                  history.map((order, i) => (
                    <React.Fragment>
                      <TableRow key={v4()}>
                        <TableCell align="center">
                          <Link to={"/orders/" + order.id}  style={{ textDecoration: 'none', color: 'darkBlue'}}>
                            Orden N{ i + 1 }
                          </Link>
                        </TableCell>
                        <TableCell align="center">{order.status.toUpperCase()}</TableCell>
                        <TableCell align="center">
                          <ul className={classes.list}>{
                            order.products.map((product) => (
                              <li key={ v4() }>{
                                  product.name
                              }</li>
                            ))
                          }</ul>
                        </TableCell>
                        <TableCell align="center">{order.address}</TableCell>
                        <TableCell align="center">$ {order.total_price}.00</TableCell>
                        <TableCell align="center">{order.details}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                }
              </React.Fragment>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}