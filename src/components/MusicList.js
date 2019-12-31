import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import TrackItem from "./TrackItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const MusicList = ({ tracks }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tracks.map(track => (
        <div key={track.id}>
          <TrackItem
            name={track.name}
            artistName={track.artists[0].name}
            albumName={track.album.name}
            imageUrl={track.album.images[0].url}
            trackPlayUrl={track.preview_url}
          />
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
};

MusicList.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default MusicList;
