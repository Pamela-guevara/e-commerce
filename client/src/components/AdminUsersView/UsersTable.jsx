import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

export default function UsersTable({ users, edituser, removeuser }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Administrador</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.mail}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.isAdmin ? (
                  'YES'
                ):('NO')}</TableCell>


                <TableCell align="center">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                      edituser(user);
                    }}
                  />
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => setModalIsOpen(true)}
                    />

                    <Modal isOpen={modalIsOpen}>
                      <p>¿Estas seguro que deseas eliminar?</p>
                      <button
                        onClick={() => {
                          setModalIsOpen(false);
                          removeuser(user.id);
                        }}
                      >
                        Si
                      </button>
                      <button onClick={() => setModalIsOpen(false)}>No</button>
                    </Modal>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
              <td>No users</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
