import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from 'react-redux';
import { postReview } from './../../redux/actions.js';

import {
  Grid,
  Button,
  makeStyles,
  Typography,
  FormControl,
  TextField,
} from "@material-ui/core";

// INITIAL STATES
const initialState = {
  productId: "no assigned",
  userId: "2",
  description: "",
  score: "1",
};

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    flexGrow: 1,
  },
  fields: {
    marginTop: "30px",
    flexGrow: 1,
  },
  button: {
    marginTop: "20px",
    marginBottom: "30px",
  },
}));

export default function ({ match }) {
  // STYLES
  const classes = useStyle();

  // DISPATCH
  const dispatch = useDispatch();

  const userId = useSelector(state => state.infoUser.id);

  // HOOKS

  const [review, setReview] = useState({
    ...initialState,
    productId: match.params.id,
    userId
  });

  // HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(postReview(review));
    setReview({
      ...initialState,
      productId: match.params.id
    });
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleOnSubmit} id="formReview">
        <div>
          <br />
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Dejar Review
          </Typography>
        </div>
        <Grid
          className={classes.fields}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <FormControl>
              <Rating
                name="score"
                onChange={handleInputChange}
                required
                value={review.score}
                size="large"
              />
            </FormControl>

            <FormControl>
              <TextField
                id="description"
                label="Reseña"
                multiline
                rows={6}
                defaultValue="Default Value"
                variant="outlined"
                name="description"
                value={review.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <Button
              size="small"
              variant="outlined"
              type="submit"
              value="Crear"
              className={classes.button}
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
