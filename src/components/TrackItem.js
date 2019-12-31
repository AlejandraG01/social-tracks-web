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
  externalPlayUrl
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

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Album image" src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {artistName}
            </Typography>
            {` — ${albumName}`}
          </>
        }
      />
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
  trackPlayUrl: PropTypes.string,
  externalPlayUrl: PropTypes.string
};

TrackItem.defaultProps = {
  imageUrl: null,
  trackPlayUrl: null,
  externalPlayUrl: null
};

export default TrackItem;
