import React from 'react';
import { shallow } from 'enzyme';
import MouseTimeDisplay from '../components/control-bar/MouseTimeDisplay';

describe('MouseTimeDisplay', () => {
  it('should render with "div" tag', () => {
    const wrapper = shallow(
      <MouseTimeDisplay
        actions={{}}
        duration={100}
        mouseTime={{
          time: 10
        }}
      />
    );
    expect(wrapper.type()).toBe('div');
  });

  it('should render with "cueplayer-react-mouse-display" class', () => {
    const wrapper = shallow(
      <MouseTimeDisplay
        actions={{}}
        duration={100}
        mouseTime={{
          time: 10
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-mouse-display')).toBe(true);
  });

  it('should render with custom text', () => {
    const text = 'aloha';
    const wrapper = shallow(
      <MouseTimeDisplay
        actions={{}}
        duration={100}
        mouseTime={{
          time: 10
        }}
        text={text}
      />
    );
    expect(wrapper.prop('data-current-time')).toEqual(text);
  });
});
