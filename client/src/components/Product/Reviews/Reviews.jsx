import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function ({ review }) {
  //  const [value, setValue] = React.useState(0);

  return (
    <div>
      <br></br>

      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating name="read-only" value={review === undefined ? 1 : review.score} readOnly="true" />
          {/* en value le pongo el valor de cantidad de estrellas que deberia tener mi reseña */}
          <Typography component="legend"></Typography>
          {review.description}
        </Box>
      </div>
    </div>
  );
}

// export default function ({ reseña }) {
//     const { usuario, date, description } = reseña;
//     const [value, setValue] = React.useState(0);

//     return (
//         <div>
//         <br></br>
//         <Typography gutterBottom variant="h5" component="h5">Opiniones sobre el producto</Typography>
//         <div>
//         <Box component="fieldset" mb={3} borderColor="transparent">
//         <Rating name="read-only" value={value} readOnly />
//         <Typography component="legend"></Typography>
//         <Typography gutterBottom variant="h6" component="h6">{usuario}</Typography>
//         <Typography>{date}</Typography>
//         <p>{description}</p>
//         </Box>
//         </div>
//         </div>
//     );
// }
