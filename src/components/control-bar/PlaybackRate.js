import React, { Component } from 'react';
import PlaybackRateMenuButton from './PlaybackRateMenuButton';
import { deprecatedWarning } from '../../utils';

export default class PlaybackRate extends Component {
  constructor(props) {
    super(props);

    deprecatedWarning('PlaybackRate', 'PlaybackRateMenuButton');
  }

  render() {
    return <PlaybackRateMenuButton {...this.props} />;
  }
}

PlaybackRate.displayName = 'PlaybackRate';
