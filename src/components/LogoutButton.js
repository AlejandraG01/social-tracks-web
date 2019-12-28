import React, { Component } from "react";
import PropTypes from "prop-types";

class LogoutButton extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    className: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
  };

  static defaultProps = {
    buttonText: "Logout"
  };

  render() {
    const { className, buttonText, handleLogout } = this.props;
    const attrs = { onClick: handleLogout };

    if (className) {
      attrs.className = className;
    }

    return (
      //<Button {...attrs} variant="contained" color="secondary">{buttonText}</Button>;
      <button {...attrs}>{buttonText}</button>
    );
  }
}

export default LogoutButton;
