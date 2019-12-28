import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

const TrackItem = ({ name, imageUrl, artistName, albumName }) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {artistName}
            </Typography>
            {` — ${albumName}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

TrackItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired
};

export default TrackItem;
