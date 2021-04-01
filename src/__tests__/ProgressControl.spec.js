import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressControl from '../components/control-bar/ProgressControl';

describe('ProgressControl', () => {
  it('should render with "div" tag', () => {
    const wrapper = shallow(<ProgressControl actions={{}} player={{}} />);

    expect(wrapper.type()).toBe('div');
  });

  it('should render with "cueplayer-react-progress-control" class', () => {
    const wrapper = shallow(<ProgressControl actions={{}} player={{}} />);
    expect(wrapper.hasClass('cueplayer-react-progress-control')).toBe(true);
  });

  it('should bind ref "seekBar"', () => {
    const wrapper = mount(<ProgressControl player={{}} />);
    expect(wrapper.instance().seekBar).toBeTruthy();
  });
});
