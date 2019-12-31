import React from "react";
import PropTypes from "prop-types";
import UnloggedContent from "../components/UnloggedContent";
import RecommendationContainer from "./RecommendationContainer";

const ContentContainer = ({ loggedUser }) => {
  const userCompletedLogin = loggedUser && loggedUser.mastodon_id;

  return userCompletedLogin ? (
    <RecommendationContainer loggedUser={loggedUser} />
  ) : (
    <UnloggedContent />
  );
};

ContentContainer.propTypes = {
  loggedUser: PropTypes.object
};

export default ContentContainer;
