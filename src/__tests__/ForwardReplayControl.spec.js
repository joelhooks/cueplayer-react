import React from 'react';
import { shallow } from 'enzyme';
import ForwardReplayControl from '../components/control-bar/ForwardReplayControl';

describe('ForwardReplayControl', () => {
  it('should render with "button" tag', () => {
    const Forwardontrol = ForwardReplayControl('forward');
    const wrapper = shallow(<Forwardontrol actions={{}} player={{}} />);

    expect(wrapper.type()).toBe('button');
  });

  it('should render with "cueplayer-react-control cueplayer-react-button" class', () => {
    const Forwardontrol = ForwardReplayControl('forward');
    const wrapper = shallow(<Forwardontrol actions={{}} player={{}} />);
    expect(
      wrapper.hasClass('cueplayer-react-control cueplayer-react-button')
    ).toBe(true);
  });
});
