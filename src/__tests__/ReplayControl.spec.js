import React from 'react';
import { shallow } from 'enzyme';
import ReplayControl from '../components/control-bar/ReplayControl';

describe('ReplayControl', () => {
  it('should render with "button" tag', () => {
    const wrapper = shallow(<ReplayControl actions={{}} player={{}} />);

    expect(wrapper.type()).toBe('button');
  });

  it('should render with "cueplayer-react-button" class', () => {
    const wrapper = shallow(<ReplayControl actions={{}} player={{}} />);
    expect(wrapper.hasClass('cueplayer-react-button')).toBe(true);
  });

  it('should render with "cueplayer-react-replay-control" class', () => {
    const wrapper = shallow(
      <ReplayControl mode="replay" actions={{}} player={{}} />
    );
    expect(wrapper.hasClass('cueplayer-react-replay-control')).toBe(true);
  });

  it('should render with "cueplayer-react-icon-replay-5" class for replay 5 seconds', () => {
    const wrapper = shallow(
      <ReplayControl seconds={5} actions={{}} player={{}} />
    );
    expect(wrapper.hasClass('cueplayer-react-icon-replay-5')).toBe(true);
  });

  it('should render with "cueplayer-react-icon-replay-10" class for replay 10 seconds', () => {
    const wrapper = shallow(
      <ReplayControl seconds={10} actions={{}} player={{}} />
    );
    expect(wrapper.hasClass('cueplayer-react-icon-replay-10')).toBe(true);
  });

  it('should render with "cueplayer-react-icon-replay-30" class for replay 30 seconds', () => {
    const wrapper = shallow(
      <ReplayControl seconds={30} actions={{}} player={{}} />
    );
    expect(wrapper.hasClass('cueplayer-react-icon-replay-30')).toBe(true);
  });
});
