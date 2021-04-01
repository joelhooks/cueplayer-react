import React from 'react';
import { shallow } from 'enzyme';
import Video from '../components/Video';

describe('Video', () => {
  it('should render with "video" tag', () => {
    const wrapper = shallow(<Video actions={{}} player={{}} />);

    expect(wrapper.type()).toBe('video');
  });

  it('should render with "cueplayer-react-video" class', () => {
    const wrapper = shallow(<Video actions={{}} player={{}} />);
    expect(wrapper.hasClass('cueplayer-react-video')).toBe(true);
  });
});
