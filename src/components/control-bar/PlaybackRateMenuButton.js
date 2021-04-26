import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import MenuButton from '../menu/MenuButton';

const propTypes = {
  player: PropTypes.object,
  actions: PropTypes.object,
  rates: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.number
};

const defaultProps = {
  rates: [2, 1.5, 1.25, 1, 0.5, 0.25]
};

class PlaybackRateMenuButton extends Component {
  constructor(props) {
    super(props);

    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(index) {
    const { rates, actions, onChange } = this.props;
    if (index >= 0 && index < rates.length) {
      actions.changeRate(rates[index]);
      if (onChange) {
        onChange(rates[index]);
      }
    }
  }

  render() {
    const { rates, player, selected } = this.props;
    const items = rates.map(rate => ({
      label: `${rate}x`,
      value: rate
    }));

    // remember 0  is a "false" in JS 🥴
    const selectedIndex =
      rates.indexOf(selected) > -1
        ? rates.indexOf(selected)
        : rates.indexOf(player.playbackRate) || 0;

    return (
      <MenuButton
        className={classNames(
          'cueplayer-react-playback-rate',
          this.props.className
        )}
        onSelectItem={this.handleSelectItem}
        items={items}
        selectedIndex={selectedIndex}
      >
        <span className="cueplayer-react-control-text">Playback Rate</span>
        <div className="cueplayer-react-playback-rate-value">
          {`${player.playbackRate.toFixed(2)}x`}
        </div>
      </MenuButton>
    );
  }
}

PlaybackRateMenuButton.propTypes = propTypes;
PlaybackRateMenuButton.defaultProps = defaultProps;
PlaybackRateMenuButton.displayName = 'PlaybackRateMenuButton';
export default PlaybackRateMenuButton;
