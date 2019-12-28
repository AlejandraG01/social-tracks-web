import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Container } from "@material-ui/core";
import { loginSpotify, loginMastodon } from "./services/UsersService";
import {
  getLoggedUser,
  saveUser,
  saveSpotifyToken,
  logoutUser
} from "./utils/LoginHandler";
import ContentContainer from "./containers/ContentContainer";
import MenuItems from "./components/MenuItems";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: "#790e8b"
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  }
}));

const App = () => {
  const [loggedUser, setLoggedUser] = useState(getLoggedUser());

  const classes = useStyles();

  const onSuccessSpotify = async data => {
    const accessToken = saveSpotifyToken(data.access_token);
    const response = await loginSpotify(accessToken);

    const { user } = response;
    setLoggedUser(saveUser(user));
  };

  const onSuccessMastodon = async data => {
    const authCode = data.code;
    const userId = JSON.parse(sessionStorage.getItem("user"))._id;
    const response = await loginMastodon(authCode, userId);
    const { user } = response;

    setLoggedUser(saveUser(user));
  };

  const onFailureSpotify = data => {
    console.log("FAILED SPOTIFY", data);
  };

  const onFailureMastodon = data => {
    console.log("FAILED MASTODON", data);
  };

  const handleLogout = () => {
    setLoggedUser(null);
    logoutUser();
  };

  // console.log("TRACK URLS", tracksUrls);
  console.log("LOGGED USER", loggedUser);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Social Tracks
            </Typography>
            <MenuItems
              handleLogout={handleLogout}
              loggedUser={loggedUser}
              onSuccessSpotify={onSuccessSpotify}
              onFailureSpotify={onFailureSpotify}
              onSuccessMastodon={onSuccessMastodon}
              onFailureMastodon={onFailureMastodon}
            />
          </Toolbar>
        </AppBar>
        <Container className={classes.mainContent}>
          <ContentContainer loggedUser={loggedUser} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
