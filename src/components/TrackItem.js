import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import LinkIcon from "@material-ui/icons/Link";
import Grid from "@material-ui/core/Grid";
import ReactStars from "react-stars";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

const TrackItem = ({
  name,
  imageUrl,
  artistName,
  albumName,
  trackPlayUrl,
  externalPlayUrl,
  rating,
  handleRatingChange,
  spotifyTrackId
}) => {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [playingAudio] = useState(new Audio(trackPlayUrl));

  const handlePlay = () => {
    if (externalPlayUrl) {
      window.open(externalPlayUrl, "_blank");
      return;
    }

    if (playing) playingAudio.pause();
    else playingAudio.play();

    setPlaying(!playing);
  };

  const renderPlayIcon = () => {
    if (externalPlayUrl) return <LinkIcon />;

    if (playing) return <PauseCircleFilledIcon />;
    else return <PlayCircleFilledIcon />;
  };

  const renderSecondaryContent = () => (
    <Grid container direction="column">
      <Grid item>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          {artistName}
        </Typography>
        {` — ${albumName}`}
      </Grid>
      <Grid item style={{ marginTop: 10 }}>
        <ReactStars
          count={5}
          value={rating}
          onChange={value => handleRatingChange(spotifyTrackId, value)}
        />
      </Grid>
    </Grid>
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Album image" src={imageUrl} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={renderSecondaryContent()} />
      <ListItemSecondaryAction>
        <IconButton onClick={handlePlay} edge="end" aria-label="delete">
          {renderPlayIcon()}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

TrackItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  trackPlayUrl: PropTypes.string,
  externalPlayUrl: PropTypes.string,
  spotifyTrackId: PropTypes.string
};

TrackItem.defaultProps = {
  imageUrl: null,
  trackPlayUrl: null,
  externalPlayUrl: null
};

export default TrackItem;
