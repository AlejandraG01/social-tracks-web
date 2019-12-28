import React from "react";
import PropTypes from "prop-types";
import UnloggedContent from "../components/UnloggedContent";
import MusicList from "../components/MusicList";
import { getUserTopTracks } from "../utils/LoginHandler";

const ContentContainer = ({ loggedUser }) => {
  const userCompletedLogin = loggedUser && loggedUser.mastodon_id;
  const topTracks = getUserTopTracks(loggedUser);

  return userCompletedLogin ? (
    <MusicList tracks={topTracks} />
  ) : (
    <UnloggedContent />
  );
};

ContentContainer.propTypes = {
  loggedUser: PropTypes.object
};

export default ContentContainer;
