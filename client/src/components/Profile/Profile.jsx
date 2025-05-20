import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ProfileView from "./profileView.jsx";
import { putUser, getUser } from '../../redux/actions.js';
import {
    Grid,
    Button,
    makeStyles,
    Typography,
    FormControl,
    Input,
    InputLabel,
    Container
} from "@material-ui/core";
import { Link } from "react-router-dom";

const initialFormState = {
    id: '',
    name: "",
    mail: "",
    lastName: "",
    isAdmin: false,
    showPassword: false
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    inputFile: {
        display: "none",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    heroContent: {
        backgroundColor: theme.palette.background.black,
        padding: theme.spacing(6, 0, 0),
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    }
}));

const Profile = ({match}) => {
    // USE STYLES
    const classes = useStyles();

    // HOOKS --------------------------------------
    const user = useSelector( state => state.infoUser );
    const [edit, setEdit] = useState(false);
    const [current, setCurrent] = useState(initialFormState);
    const [call, setCall] = useState(true);
    const dispatch = useDispatch();
    var userId = match.params.id

    // HANDLERS -----------------------------------
    function handleOnSubmit(event) {
        event.preventDefault();
        if (edit) {
            dispatch(putUser(current));
            setEdit(false);
            setCurrent(initialFormState);
        };
    };

    function handleOnChange(event) {
        const { name, value } = event.target;

        setCurrent({
            ...current,
            [name]: value,
        });
    };

    function handleOnEdit(user) {
        setCurrent(user);
        setEdit(true);
    };

    function handleOnReset() {
        setCurrent(initialFormState);
        setEdit(false);
    };

    useEffect(()=>{
        if(call) {
            dispatch(getUser(userId));
            setCall(false)
        }
    }, [dispatch, call, userId])

    return (
        <div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h3"
                        variant="h4"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Información de usuario
          </Typography>
                </Container>
            </div>
            <div className={classes.root}>
                <form id="form" onSubmit={(event) => handleOnSubmit(event)}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <Container>
                                <FormControl>
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        id="mail"
                                        name="mail"
                                        type="text"
                                        placeholder="Email"
                                        onChange={handleOnChange}
                                        value={current.mail}
                                        required
                                    />
                                </FormControl>
                            </Container>
                        </Grid>
                        <Grid item xs={2}>
                            <Container>
                                <FormControl>
                                    <InputLabel>Nombre</InputLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Nombre"
                                        onChange={handleOnChange}
                                        value={current.name}
                                        required
                                    />
                                </FormControl>
                            </Container>
                        </Grid>
                        <Grid item xs={2}>
                            <Container>
                                <FormControl>
                                    <InputLabel>Apellido</InputLabel>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Apellido"
                                        onChange={handleOnChange}
                                        value={current.lastName}
                                        required
                                    />
                                </FormControl>
                            </Container>
                        </Grid>
                    </Grid>

                    <br />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={2}>
                            <Button size="small" color="primary" type="submit">
                                {edit ? "Editar" : ""}
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                size="small"
                                type="reset"
                                onClick={() => handleOnReset()}
                                color="primary"
                            >
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                size="small"
                                color="primary"
                            >
                                <Link to={"/reset"} style={{textDecoration: "none", color: "inherit"}}>
                                    Cambiar contraseña
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br />
            <br />
            <div>
                <ProfileView
                    user={user}
                    edituser={handleOnEdit}
                />
            </div>
        </div>
    );
};

export default Profile;
