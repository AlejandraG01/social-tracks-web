import React from "react";
import PropTypes from "prop-types";
import SpotifyLogin from "react-spotify-login";
import { makeStyles } from "@material-ui/core/styles";
import MastodonLogin from "./MastodonLogin";
import LogoutButton from "./LogoutButton";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SCOPES,
  MASTODON_AUTH_URL
} from "../config";

const useStyles = makeStyles(theme => ({
  button: {
    margin: "4px",
    border: "none",
    backgroundColor: "rgba(255,255,255,0)",
    color: "white",
    fontSize: "18px",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

const MenuItems = ({
  loggedUser,
  handleLogout,
  onSuccessSpotify,
  onFailureSpotify,
  onSuccessMastodon,
  onFailureMastodon
}) => {
  const classes = useStyles();

  const userHasMastodon = loggedUser && loggedUser.mastodon_id;

  if (loggedUser) {
    return userHasMastodon ? (
      <LogoutButton handleLogout={handleLogout} className={classes.button} />
    ) : (
      <MastodonLogin
        className={classes.button}
        authorizeUri={MASTODON_AUTH_URL}
        onSuccess={onSuccessMastodon}
        onFailure={onFailureMastodon}
      />
    );
  }

  return (
    <SpotifyLogin
      className={classes.button}
      clientId={SPOTIFY_CLIENT_ID}
      redirectUri={SPOTIFY_REDIRECT_URL}
      scope={SPOTIFY_SCOPES}
      onSuccess={onSuccessSpotify}
      onFailure={onFailureSpotify}
    />
  );
};

MenuItems.propTypes = {
  loggedUser: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  onSuccessSpotify: PropTypes.func.isRequired,
  onFailureSpotify: PropTypes.func.isRequired,
  onSuccessMastodon: PropTypes.func.isRequired,
  onFailureMastodon: PropTypes.func.isRequired
};

MenuItems.defaultProps = {
  loggedUser: null
};

export default MenuItems;
