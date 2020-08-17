import React from 'react';
import { render } from '@testing-library/react';
import Home from '../components/Home'
import { shallow } from 'enzyme'
import About from '../components/About';
import Contacts from '../components/Contacts';
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register';


describe("Component Render Testing", ()=>{
  test('Renders Home without crashing', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('h1').text()).toContain('Home')
  });
  test('Renders About without crashing', () => {
    const wrapper = shallow(<About/>);
    expect(wrapper.find('h1').text()).toContain('About')
  });
  test('Renders Contacts without crashing', () => {
    const wrapper = shallow(<Contacts/>);
    expect(wrapper.find('h1').text()).toContain('Contact Us')
  });
  test('Renders Profile without crashing', () => {
    const wrapper = shallow(<Profile/>);
    expect(wrapper.find('h1').text()).toContain('My Profile')
  });
  test('Renders Login without crashing', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('h1').text()).toContain('Login')
  });
  test('Renders Login without crashing', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('h1').text()).toContain('Register')
  });
})

// describe("Register/Login UI Testing", ()=>{
//   test('Renders Contacts without crashing', () => {
//     const wrapper = shallow(<Login/>);
//     expect(wrapper.find('#username').length).toEqual(1)
//     expect(wrapper.find('#password').length).toEqual(1)
//   });
// })
