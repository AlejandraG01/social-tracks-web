import React from 'react';
import './App.css';
import SpotifyLogin from 'react-spotify-login';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URL, MASTODON_AUTH_URL } from './config';
import { loginSpotify, loginMastodon } from './services/UsersService';
import MastodonLogin from './MastodonLogin';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  title: {
    flexGrow: 1,
  },
  toolbar:{
    backgroundColor:'#790e8b'
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  button: {
    margin: '4px',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white',
    fontSize: '18px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

function App() {
  const classes = useStyles();

  const onSuccess = async (data) => {
    const accessToken = data.access_token;
    sessionStorage.setItem('access_token', accessToken);
    const response = await loginSpotify(accessToken);
    const { user } = response;
    sessionStorage.setItem('user', JSON.stringify(user));

    console.log("RESPOSTA", response);
  }

  const onSuccessMastodon = async (data) => {
    const authCode = data.code;
    sessionStorage.setItem('mastodon_auth_code', authCode);
    const userId = JSON.parse(sessionStorage.getItem('user'))._id;
    const response = await loginMastodon(authCode, userId);
    const { user } = response;
    sessionStorage.setItem('user', JSON.stringify(user));

    console.log("RESPOSTA", response);
  }

  const onFailure = (data) => {
    console.log("FAILED", data);
  }

  const onFailureMastodon = (data) => {
    console.log("FAILED MASTODON", data);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              Social Tracks
            </Typography>
            <SpotifyLogin
              className={classes.button}
              clientId={SPOTIFY_CLIENT_ID}
              redirectUri={SPOTIFY_REDIRECT_URL}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
            <MastodonLogin
              className={classes.button}
              authorizeUri={MASTODON_AUTH_URL}
              onSuccess={onSuccessMastodon}
              onFailure={onFailureMastodon}
            />
          </Toolbar>
        </AppBar>
        <Container className={classes.mainContent}>
          <Typography variant="h4" component="span">
            Faça login com o Spotify e com Mastodon.
          </Typography>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;