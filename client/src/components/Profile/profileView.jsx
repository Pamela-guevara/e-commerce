import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

export default function ProfileView({ user, edituser }) {
  
  // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();
  const history = useHistory();
  
  function cerrarSesion(){
    dispatch(logOutUser());
    history.push("/login")
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(user !== undefined) ? 
              <TableRow key={user.id}>
                <TableCell align="center">{user.mail}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">
                  <FontAwesomeIcon
                    style={{ marginLeft: '5px', alignItems: 'center' }}
                    icon={faEdit}
                    onClick={() => {
                      edituser(user);
                    }}
                  />
                  <MeetingRoomIcon 
                  style={{ marginLeft: '10px', alignItems: 'center' }}
                  onClick={() => cerrarSesion()}
                  />
                </TableCell>
              </TableRow>
          : <div></div>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
