import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  activateIndex: PropTypes.number,
  onSelectItem: PropTypes.func
};

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { index, onSelectItem } = this.props;
    onSelectItem(index);
  }

  render() {
    const { item, index, activateIndex } = this.props;
    return (
      <li
        className={classNames({
          'cueplayer-react-menu-item': true,
          'cueplayer-react-selected': index === activateIndex
        })}
        role="menuitem"
        onClick={this.handleClick}
      >
        {item.label}
        <span className="cueplayer-react-control-text" />
      </li>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.displayName = 'MenuItem';
