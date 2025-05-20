import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus, getOrderUser, postMailUser } from '../../redux/actions.js';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus( props ) {

    // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector( state => state.info_cart_user )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(getOrderUser(props.id))
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function procesando() {
    dispatch(updateOrderStatus(props.id, 'procesando', props.status));
    setTimeout(dispatch(postMailUser(props.id, user.name, user.mail)) , 30000)
  };

  function completado() {
    dispatch(updateOrderStatus(props.id, 'completada', props.status));
    setTimeout(dispatch(postMailUser(props.id, user.name, user.mail)), 30000);
  }

  function cancelado() {
    dispatch(updateOrderStatus(props.id, 'cancelada', props.status));
    setTimeout(dispatch(postMailUser(props.id, user.name, user.mail)), 5 * 1000);
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Estados
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => procesando()}>
          <ListItemIcon>
            <UpdateRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Procesando" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => completado()}>
          <ListItemIcon>
            <BeenhereRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Completado" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => cancelado()}>
          <ListItemIcon>
            <HighlightOffRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cancelado" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}