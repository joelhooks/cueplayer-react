import React from 'react';
import { shallow } from 'enzyme';
import PlayToggle from '../components/control-bar/PlayToggle';

describe('PlayToggle', () => {
  it('should render with "button" tag', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );

    expect(wrapper.type()).toBe('button');
  });

  it('should render with "cueplayer-react-button" class', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-button')).toBe(true);
  });

  it('should render with "cueplayer-react-paused" class when video has been paused', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: true
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-paused')).toBe(true);
  });

  it('should render with "cueplayer-react-playing" class when video has been playing', () => {
    const wrapper = shallow(
      <PlayToggle
        actions={{}}
        player={{
          paused: false
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-playing')).toBe(true);
  });
});
