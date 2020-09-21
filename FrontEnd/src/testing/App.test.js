import React from 'react';
import Home from '../components/Home'
import AddEmployee from '../components/AddEmployee'
import { shallow } from 'enzyme'
import About from '../components/About';
import Contacts from '../components/Contacts';
import Login from '../components/Login'
import Profile from '../components/Profile'
import Register from '../components/Register';
import employeeReducer from '../reducers/employeeReducer';
import servicesReducer from '../reducers/servicesReducer'
import store from "../store"
import { types } from '../actions/types'




const findByTestAttr = (component,attr) =>{
  const wrapper = component.find(`[data-test='${attr}']`)
  return wrapper;
}


describe("Component Render Testing", ()=>{
  test('Renders Home without crashing', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('p').text()).toContain('Welcome to BookMe!')
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
    expect(wrapper.find('h1').text()).toContain('My Dashboard')
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

describe("Admin Dashboard Tests",()=>{
  let profileWrapper;
  let addEmplWrapper;
  // let addShiftWrapper;
  beforeEach(()=>{
     profileWrapper = shallow(<Profile/>)
     addEmplWrapper = shallow(
       <AddEmployee store={store}/>
     )

  })

  test("Render buttons with text `Add Employee` and `Add Shift`", () =>{
    expect(findByTestAttr(profileWrapper,'addEmployee').text()).toBe("Add Employee")
    expect(findByTestAttr(profileWrapper,'addShift').text()).toBe("Add Shift")
  })

})

describe("Empployee Reducer Tests",()=>{
  test("Should return default state",()=>{
     const state = employeeReducer(undefined,{})
     expect(state).toEqual({availability:[],employees:[]})
  })
  test("Should return list of employees",()=>{
    const employees = [{username:"username",password:"password",name:"name"}, {username:"username1",password:"password1",name:"name1"}]
    const state = employeeReducer({},{
      type: types.GET_EMPLOYEES,
      response: employees
    })
    expect(state).toEqual({employees:employees})
  })
})

describe("Service Reducer Tests",()=>{
  test("Should return default state",()=>{
     const state = servicesReducer(undefined,{})
     expect(state).toEqual({services:[]})
  })
  test("Should return list of services",()=>{
    const services = [{id:"1",name:"service1",description:"service"}, {id:"2",name:"service2",description:"service"}]
    const state = servicesReducer({},{
      type: types.GET_SERVICE,
      response: services
    })
    expect(state).toEqual({services:services})
  })
})