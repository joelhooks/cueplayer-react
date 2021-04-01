import React from 'react';
import { shallow, mount } from 'enzyme';
import SeekBar from '../components/control-bar/SeekBar';

describe('SeekBar', () => {
  it('should render with "div" tag', () => {
    const wrapper = mount(
      <SeekBar
        actions={{}}
        player={{
          duration: 200,
          currentTime: 50
        }}
        mouseTime={{
          time: 100,
          position: 0
        }}
      />
    );

    expect(wrapper.find('div.cueplayer-react-slider').length).toBe(1);
  });

  it('should render with "cueplayer-react-progress-holder" class', () => {
    const wrapper = shallow(
      <SeekBar
        actions={{}}
        player={{
          duration: 200,
          currentTime: 50
        }}
        mouseTime={{
          time: 100,
          position: 0
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-progress-holder')).toBe(true);
  });
});
