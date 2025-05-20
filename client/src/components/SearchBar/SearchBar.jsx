import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getSearch } from '../../redux/actions.js';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    color: "black",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "blak",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// ToDo: Alinear el placeholder "Buscar"

export default function () {

  const dispatch = useDispatch();

  const classes = useStyles();
  const user = useSelector( state => state.infoUser );
  const log = useSelector( state => state.logIn );
  const objetos = useSelector( state => state.Cantidad );
  const [find, setFind] = useState('');

  function buscar(word) {
    setFind('');
    var objeto = { keyWord: word };
    dispatch(getSearch(objeto));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography color="textPrimary" style={{marginRight: '10px'}}>
            <Link to='/' style={{ textDecoration: 'none', color: 'black'}}>Catálogo</Link>
          </Typography>
          {
            user ? (
              <React.Fragment>
                {
                  user.isAdmin ? (
                    <React.Fragment>
                      <Typography color="textPrimary" style={{marginRight: '10px'}}>
                        <Link to='/NewCategory' style={{ textDecoration: 'none', color: 'black' }}>Categorías</Link>
                      </Typography>
                      <Typography color="textPrimary" style={{marginRight: '10px'}}>
                        <Link to='/CRUD' style={{ textDecoration: 'none', color: 'black' }}>Productos</Link>
                      </Typography>
                      <Typography color="textPrimary" style={{marginRight: '10px'}}>
                        <Link to='/ordersView' style={{ textDecoration: 'none', color: 'black' }}>Ordenes</Link>
                      </Typography>
                      <Typography color="textPrimary" style={{marginRight: '10px'}}>
                        <Link to='/usersView' style={{ textDecoration: 'none', color: 'black' }}>Usuarios</Link>
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography color="textPrimary" style={{marginRight: '10px'}}>
                        <Link to='/history' style={{ textDecoration: 'none', color: 'black'}}>Mis compras</Link>
                      </Typography>
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )
          }
          
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          ></Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="input"
              placeholder="Buscar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={find}
              onChange={e => setFind(e.target.value)}
            />
            <Button color="primary">
              <Link to={"/search?keyWord=" + find} style={{ textDecoration: 'none', color: 'black'}} 
                    onClick={() => buscar(find)}
              >
                Buscar
              </Link>
            </Button>
          </div>
          {
            user ? (
              <React.Fragment>
                {
                  !user.isAdmin ? (
                    <React.Fragment>
                      <IconButton aria-label="cart">
                        {/* <StyledBadge badgeContent={objetos} color="primary"> */}
                        { (user !==  undefined) ? 
                        <Link to={ `/cart/${user.id}` } style={{ textDecoration: 'none', color: 'Grey' }}>
                          <ShoppingCartIcon />
                        </Link> : 
                        <Link to={ `/cart/1` } style={{ textDecoration: 'none', color: 'Grey' }}>
                          <ShoppingCartIcon />
                        </Link> }
                        {/* </StyledBadge> */}
                      </IconButton>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )
                }
              </React.Fragment>
            ) : (
              <React.Fragment>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={objetos} color="primary">
                  { (user !==  undefined) ? 
                  <Link to={ `/cart/${user.id}` } style={{ textDecoration: 'none', color: 'Grey' }}>
                    <ShoppingCartIcon />
                  </Link> : 
                  <Link to={ `/cart_guest` } style={{ textDecoration: 'none', color: 'Grey' }}>
                    <ShoppingCartIcon />
                  </Link> }
                  </StyledBadge>
                </IconButton>
              </React.Fragment>
            )
          }
          { (user !==  undefined) ?
          <IconButton color='primary' aria-label='account'>
            <Link to={`/${user.id}/profile`} style={{ textDecoration: 'none', color: log ? 'Yellow' : 'Blue' }}>
              <AccountCircle />
            </Link>
            </IconButton>
            : <IconButton color='primary' aria-label='account'>
            <Link to='/register' style={{ textDecoration: 'none', color: log ? 'Yellow' : 'Blue' }}>
              <AccountCircle />
            </Link>
            </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
