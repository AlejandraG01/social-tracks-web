import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import Grid from "@material-ui/core/Grid";
import { getRecommendations } from "../services/RecommendationsService";
import GeneratingRecommendations from "../components/GeneratingRecommendations";
import MusicTabs from "../components/MusicTabs";

const useStyles = makeStyles(theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const RecommendationContainer = ({ loggedUser }) => {
  const [tracks, setRecommendationTracks] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateInterval, setGenerateInterval] = useState(null);
  const classes = useStyles();

  const handleGenerateRecommendation = useCallback(async () => {
    const { recommendation } = await getRecommendations(loggedUser);
    const recommendationTracks = recommendation.recommendation_tracks;
    const generatingRecommendation = recommendation.generating_recommendation;

    setIsGenerating(generatingRecommendation);
    setRecommendationTracks(recommendationTracks);
  }, [loggedUser]);

  useEffect(() => {
    if (isGenerating && !generateInterval) {
      setGenerateInterval(
        setInterval(() => handleGenerateRecommendation(), 1000)
      );
    } else if (!isGenerating && generateInterval) {
      clearInterval(generateInterval);
      setGenerateInterval(null);
    }
  }, [isGenerating, generateInterval, handleGenerateRecommendation]);

  if (isGenerating) return <GeneratingRecommendations />;
  if (tracks) return <MusicTabs recommendationTracks={tracks} />;

  return (
    <Grid container spacing={3}>
      <Grid
        container
        justify="center"
        alignItems="center"
        textAlign="center"
        xs={12}
      >
        <Typography
          variant="h4"
          component="span"
          style={{ textAlign: "center" }}
        >
          Espere até todos os usuários estarem cadastrados e gere sua
          recomendação :)
        </Typography>
      </Grid>
      <Grid container justify="center" alignItems="center" item xs={12}>
        <Fab
          color="secondary"
          variant="extended"
          onClick={handleGenerateRecommendation}
        >
          <SlowMotionVideoIcon className={classes.extendedIcon} />
          Gerar Recomendações
        </Fab>
      </Grid>
    </Grid>
  );
};

RecommendationContainer.propTypes = {
  loggedUser: PropTypes.object.isRequired
};

export default RecommendationContainer;
