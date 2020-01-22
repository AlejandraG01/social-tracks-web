import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import TrackItem from "./TrackItem";
import { getRatings, createRating } from "../services/RatingsService";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const MusicList = ({ tracks }) => {
  const classes = useStyles();
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    if (ratings === null) {
      getRatings().then(ratings => {
        console.info(ratings);
        setRatings(ratings);
      });
    }
  }, [ratings]);

  const onRatingChange = (spotifyTrackId, value) => {
    createRating(spotifyTrackId, value);
    setRatings({
      ...ratings,
      [spotifyTrackId]: value
    });
  };

  if (ratings === null) return null;

  return (
    <List className={classes.root}>
      {tracks.map(track => (
        <div key={track.id}>
          <TrackItem
            name={track.name}
            artistName={track.artists[0].name}
            albumName={track.album.name}
            imageUrl={
              track.album.images.length > 0 ? track.album.images[0].url : null
            }
            trackPlayUrl={track.preview_url}
            externalPlayUrl={getUrl(track)}
            rating={ratings[track.id] || 0}
            handleRatingChange={onRatingChange}
            spotifyTrackId={track.id}
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

function getUrl(track) {
  if (track.preview_url) {
    return null;
  } else {
    if (
      track.external_urls !== undefined &&
      track.external_urls.spotify !== undefined
    ) {
      return track.external_urls.spotify;
    } else {
      return null;
    }
  }
}

export default MusicList;
