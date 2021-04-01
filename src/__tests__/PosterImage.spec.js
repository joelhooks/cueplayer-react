import React from 'react';
import { shallow } from 'enzyme';
import PosterImage from '../components/PosterImage';

describe('PosterImage', () => {
  it('should render with "div" tag', () => {
    const wrapper = shallow(
      <PosterImage
        poster="poster.png"
        player={{
          hasStarted: false
        }}
      />
    );

    expect(wrapper.type()).toBe('div');
  });

  it('should render with "cueplayer-react-poster" class', () => {
    const wrapper = shallow(
      <PosterImage
        poster="poster.png"
        player={{
          hasStarted: false
        }}
      />
    );
    expect(wrapper.hasClass('cueplayer-react-poster')).toBe(true);
  });
});
