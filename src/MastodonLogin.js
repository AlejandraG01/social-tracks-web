import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { Button } from '@material-ui/core';

class MastodonLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    className: PropTypes.string,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    authorizeUri: PropTypes.string
  }

  static defaultProps = {
    buttonText: 'Sign in with Mastodon',
    onRequest: () => { },
    onSuccess: () => { },
    onFailure: () => { },
  }

  onBtnClick = () => {
    const { authorizeUri } = this.props;
    const popup = this.popup = PopupWindow.open(
      'mastodon-authorization',
      authorizeUri,
      { height: 1000, width: 600 }
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess(data),
      error => this.onFailure(error)
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    console.log('onSucess: ' + JSON.stringify(data));
    if (!data.code) {
      return this.onFailure(new Error('\'code\' not found'));
    }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const { className, buttonText } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return (
      //<Button {...attrs} variant="contained" color="secondary">{buttonText}</Button>; 
    <button {...attrs}>{buttonText}</button>
    );
  }
}

export default MastodonLogin;
