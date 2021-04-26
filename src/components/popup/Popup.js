import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  player: PropTypes.object,
  children: PropTypes.any
};

export default class Popup extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    // event.stopPropagation();
  }

  render() {
    const { children } = this.props;
    return (
      <div className="cueplayer-react-menu" onClick={this.handleClick}>
        <div className="cueplayer-react-menu-content">{children}</div>
      </div>
    );
  }
}

Popup.propTypes = propTypes;
Popup.displayName = 'Popup';
