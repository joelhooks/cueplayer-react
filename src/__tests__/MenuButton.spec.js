import React from 'react';
import { shallow, mount } from 'enzyme';
import ClickableComponent from '../components/ClickableComponent';
import MenuButton from '../components/menu/MenuButton';

const items = [1, 2, 3, 4].map(i => ({
  label: `item${i}`,
  value: `item${i}`
}));

describe('ClosedCaptionButton', () => {
  it('should render with "MenuButton" tag', () => {
    const wrapper = shallow(
      <MenuButton items={items} selectedIndex={0}>
        <span className="cueplayer-react-control-text">Button</span>
      </MenuButton>
    );

    expect(wrapper.type()).toBe(ClickableComponent);
  });

  it('should show menu items after click', () => {
    const wrapper = mount(
      <MenuButton items={items} selectedIndex={0}>
        <span className="cueplayer-react-control-text">Button</span>
      </MenuButton>
    );

    expect(wrapper.find('.cueplayer-react-menu-item').length).toEqual(0);
    expect(wrapper.find('div.cueplayer-react-menu-button').length).toEqual(1);
    wrapper.find('div.cueplayer-react-menu-button').simulate('click');
    expect(wrapper.find('.cueplayer-react-menu-item').length).toEqual(4);
  });
});
