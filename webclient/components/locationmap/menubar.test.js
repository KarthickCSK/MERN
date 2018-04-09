import React from 'react';
import {shallow} from 'enzyme';
import MenuBarItem from './menubar.jsx';

describe('MenuBarItem', () => {
  it('Component renders correctly', () => {
    const wrapper = shallow(<MenuBarItem />);
    expect(wrapper.length).toBe(1);
  });
});
