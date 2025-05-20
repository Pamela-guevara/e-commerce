import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { getOrdersAdmin, getOrdersFiltersAdmin } from '../../redux/actions.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Todos', 'carrito', 'creada', 'procesando', 'completada', 'cancelada'];
}

export default function FilterCheckbox() {

    // Traer la función que despacha las acciones al reducer
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleStep = (step, status) => () => {
    setActiveStep(step);
    if(status === 'Todos') {
        dispatch(getOrdersAdmin());
    } else {
        dispatch(getOrdersFiltersAdmin(status))
    }
  };

  return (
    <div className={classes.root}>
        <div>
            <br/>
        </div>
        <Typography component="h1" style={{fontSize: '20px'}}>
            Estados de la Orden
        </Typography>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label} >
              <StepButton
                onClick={handleStep(index, label)}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}