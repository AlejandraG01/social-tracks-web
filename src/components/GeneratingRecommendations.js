import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const GeneratingRecommendations = () => (
  <Grid container spacing={3}>
    <Grid container alignItems="center" justify="center" xs={12}>
      <Typography variant="h4" component="span">
        Gerando recomendações...
      </Typography>
    </Grid>
    <Grid
      container
      alignItems="center"
      justify="center"
      xs={12}
      style={{ marginTop: 20 }}
    >
      <CircularProgress color="secondary" />
    </Grid>
  </Grid>
);

export default GeneratingRecommendations;
