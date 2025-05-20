import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Grid } from '@material-ui/core';
import Modal from "react-modal";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function ProductTable({ products, editProduct, removeProduct }) {
  const [askDelete, setAskDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Categorias</TableCell>
            <TableCell align="center">Marca</TableCell>
            <TableCell align="center">Colores</TableCell>
            <TableCell align="center">Tamaño</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="center">
                  <ul>
                    {product.categories.map((e) => (
                    <li>
                      {e.name}
                    </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.colors}</TableCell>
                <TableCell align="center">{product.size}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => editProduct(product)}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={() => { setAskDelete(true); setId(product.id); }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => { setOpenModal(true); setId(product.id); }}>
                    <PhotoCamera />
                  </IconButton>
                  {
                    askDelete && id === product.id? (
                      <Alert severity="warning" align="center">
                        <AlertTitle>¿Estas seguro?</AlertTitle>
                        <Button onClick={() => { 
                          removeProduct(product.id)
                          setAskDelete(true);
                        }}>Si</Button>
                        <Button onClick={() => {
                          setAskDelete(false);
                          setId(null);
                        }
                        }>No</Button>
                      </Alert>
                    ) : (
                      <React.Fragment></React.Fragment>
                    )
                  }
                </TableCell>
                <Modal isOpen={openModal && id === product.id} style={customStyles}>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <img src={product.img} alt={product.name} width="350px"/>
                    <Button 
                    onClick={() => {
                      setOpenModal(false);
                      setId(null);
                    }}
                    color="primary"
                    >Cerrar</Button>
                  </Grid>
                </Modal>
              </TableRow>
            ))
          ) : (
              <tr>
                <td>No products</td>
              </tr>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
