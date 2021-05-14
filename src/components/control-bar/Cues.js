import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import MenuButton from '../menu/MenuButton';

const propTypes = {
  player: PropTypes.object,
  actions: PropTypes.object,
  className: PropTypes.string,
  offMenuText: PropTypes.string,
  showOffMenu: PropTypes.bool,
  kinds: PropTypes.array
};

const defaultProps = {
  offMenuText: 'Off',
  showOffMenu: true,
  kinds: ['metadata'] // `kind`s of TextTrack to look for to associate it with this menu.
};

class CuesButton extends Component {
  constructor(props) {
    super(props);

    this.getTextTrackItems = this.getTextTrackItems.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);

    this.state = this.getTextTrackItems();
  }

  componentDidMount() {
    const { selected, player, actions } = this.props;

    console.log(player);
    const { textTracks = [] } = player;
    if (selected && textTracks.length > 0) {
      Array.from(textTracks).forEach(textTrack => {
        if (textTrack.language === selected.language) {
          textTrack.mode = 'showing';
          actions.activateTextTrack(textTrack);
        }
      });
    }
  }

  componentDidUpdate() {
    this.updateState();
  }

  getTextTrackItems() {
    const { kinds, player, offMenuText, showOffMenu } = this.props;
    const { textTracks, activeTextTrack } = player;
    const textTrackItems = {
      items: [],
      selectedIndex: 0
    };
    const tracks = Array.from(textTracks || []);

    if (tracks.length === 0) {
      return textTrackItems;
    }

    if (showOffMenu) {
      textTrackItems.items.push({
        label: offMenuText || 'Off',
        value: null
      });
    }

    tracks.forEach(textTrack => {
      // ignore invalid text track kind
      if (kinds.length && !kinds.includes(textTrack.kind)) {
        return;
      }

      textTrackItems.items.push({
        label: textTrack.label,
        value: textTrack.language
      });
    });

    textTrackItems.selectedIndex = textTrackItems.items.findIndex(
      item => activeTextTrack && activeTextTrack.language === item.value
    );

    if (textTrackItems.selectedIndex === -1) {
      textTrackItems.selectedIndex = 0;
    }

    return textTrackItems;
  }

  updateState() {
    const textTrackItems = this.getTextTrackItems();
    if (
      textTrackItems.selectedIndex !== this.state.selectedIndex ||
      !this.textTrackItemsAreEqual(textTrackItems.items, this.state.items)
    ) {
      this.setState(textTrackItems);
    }
  }

  textTrackItemsAreEqual(items1, items2) {
    if (items1.length !== items2.length) {
      return false;
    }

    for (let i = 0; i < items1.length; i++) {
      if (
        !items2[i] ||
        items1[i].label !== items2[i].label ||
        items1[i].value !== items2[i].value
      ) {
        return false;
      }
    }

    return true;
  }

  handleSelectItem(index) {
    const { player, showOffMenu, onChange } = this.props;
    const { textTracks } = player;
    let selectedTrack;

    console.log('INDEX', player);

    // For the 'subtitles-off' button, the first condition will never match
    // so all subtitles will be turned off
    Array.from(textTracks).forEach((textTrack, i) => {
      // if it shows the `Off` menu, the first item is `Off`
      if (index === (showOffMenu ? i + 1 : i)) {
        textTrack.mode = 'showing';
        selectedTrack = textTrack;
      } else {
        textTrack.mode = 'hidden';
      }
    });

    console.log(selectedTrack);

    selectedTrack.addEventListener('cuechange', e => {
      console.log(selectedTrack.activeCues);
    });

    if (onChange) {
      onChange(selectedTrack);
    }
  }

  render() {
    const { items, selectedIndex } = this.state;

    return (
      <MenuButton
        className={classNames('cueplayer-react-cues', this.props.className)}
        onSelectItem={this.handleSelectItem}
        items={items}
        selectedIndex={selectedIndex}
      >
        <span className="cueplayer-react-control-text">Closed Caption</span>
      </MenuButton>
    );
  }
}

CuesButton.propTypes = propTypes;
CuesButton.defaultProps = defaultProps;
CuesButton.displayName = 'CuesButton';
export default CuesButton;
