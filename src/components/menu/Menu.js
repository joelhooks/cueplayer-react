import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.any
};

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    // event.stopPropagation();
  }

  render() {
    return (
      <div
        className="cueplayer-react-menu cueplayer-react-lock-showing"
        role="presentation"
        onClick={this.handleClick}
      >
        <ul className="cueplayer-react-menu-content">{this.props.children}</ul>
      </div>
    );
  }
}

Menu.propTypes = propTypes;
Menu.displayName = 'Menu';
