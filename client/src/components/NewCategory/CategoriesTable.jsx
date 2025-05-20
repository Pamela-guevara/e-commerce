import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const CategoriesTable = ({ categories, deleteCategory, editCategory }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Nombre de categoria</TableCell>
          <TableCell align="center">Descripcion</TableCell>
          <TableCell align="right">Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell align="left">{category.name}</TableCell>
              <TableCell align="center">{category.description}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => editCategory(category)}
                >
                  Modificar
              </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => deleteCategory(category.id)}
                >
                  Eliminar
              </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
            <tr>
              <td align="left">Sin Categorias</td>
            </tr>
          )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CategoriesTable;
