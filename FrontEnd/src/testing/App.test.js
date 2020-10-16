import React from 'react';
import Home from '../components/Home'
import AddEmployee from '../components/AddEmployee'
import { shallow } from 'enzyme'
import About from '../components/About';
import Contacts from '../components/Contacts';
import Login from '../components/Login'
import Admin from '../components/Admin'
import Register from '../components/Register';
import employeeReducer from '../reducers/employeeReducer';
import servicesReducer from '../reducers/servicesReducer'
import { types } from '../actions/types'
import thunk from 'redux-thunk'
import authReducer from '../reducers/authReducer';


const findByTestAttr = (component,attr) =>{
  const wrapper = component.find(`[data-test='${attr}']`)
  return wrapper;
}



// describe("Component Render Testing for Admin", ()=>{

//   test('Renders Home without crashing', () => {
//     const wrapper = shallow(<Home store={store}/>);
//     expect(wrapper.find('p').text()).toContain('Welcome to BookMe!')
//   });
//   test('Renders About without crashing', () => {
//     const wrapper = shallow(<About store={store}/>);
//     expect(wrapper.find('h1').text()).toContain('About')
//   });
//   test('Renders Contacts without crashing', () => {
//     const wrapper = shallow(<Contacts/>);
//     expect(wrapper.find('h1').text()).toContain('Contact Us')
//   });
//   test('Renders Login without crashing', () => {
//     const wrapper = shallow(<Login store={store}/>);
//     expect(wrapper.find('h1').text()).toContain('Login')
//   });
//   test('Renders Login without crashing', () => {
//     const wrapper = shallow(<Register/>);
//     expect(wrapper.find('h1').text()).toContain('Register')
//   });
// })

// describe("Admin Dashboard Tests",()=>{
//   let profileWrapper;
//   let addEmplWrapper;
//   // let addShiftWrapper;


//   })

//   test("Render buttons on admin page", () =>{
//     expect(findByTestAttr(profileWrapper,'addEmployee').text()).toBe("Add Employee")
//     expect(findByTestAttr(profileWrapper,'addShift').text()).toBe("Add Shift")
//     expect(findByTestAttr(profileWrapper,'addService').text()).toBe("Add Service")
//     expect(findByTestAttr(profileWrapper,'setAvailability').text()).toBe("Set Availability")
//     expect(findByTestAttr(profileWrapper,'addService').text()).toBe("Add Service")
//     expect(findByTestAttr(profileWrapper,'setAvailability').text()).toBe("Set Availability")
//     expect(findByTestAttr(profileWrapper,'bookings').text()).toBe("View Customer Bookings")
//     expect(findByTestAttr(profileWrapper,'changePassword').text()).toBe("Change Password")
    
//   })

// })

describe("Empployee Reducer Tests",()=>{
  test("Should return default state",()=>{
     const state = employeeReducer(undefined,{})
     expect(state).toEqual({authError:"",availability:[],employees:[],msg:'',msgStyle:''})
  })
  test("Should return list of employees",()=>{
    const employees = [{username:"username",password:"password",name:"name"}, {username:"username1",password:"password1",name:"name1"}]
    const state = employeeReducer({},{
      type: types.GET_EMPLOYEES,
      response: employees
    })
    expect(state).toEqual({employees:employees})
  })
  test("Should update state, when availablity is added",()=>{
   const  msg = "Availability Updated!"
   const  msgStyle ="text-green-500 text-xl text-center italic"
    const state = employeeReducer({},{
      type: "ADD_AVAILABILITY"
    })
    expect(state).toEqual({msg:msg,msgStyle:msgStyle})
  })
  test("Should get available days and add it to to the state",()=>{
     const availability = ["MONDAY","WENDESDAY","FRIDAY"]
     const state = employeeReducer({},{
       type: "GET_AVAILABILITY",
       response: availability
     })
     expect(state).toEqual({availability:availability})
   })
})

describe("Service Reducer Tests",()=>{
  test("Should return default state",()=>{
     const state = servicesReducer(undefined,{})
     expect(state).toEqual({msg:'',msgStyle:'',services:[]})
  })
  test("Should return list of services",()=>{
    const services = [{id:"1",name:"service1",description:"service"}, {id:"2",name:"service2",description:"service"}]
    const state = servicesReducer({},{
      type: "GET_SERVICE",
      response: services
    })
    expect(state).toEqual({services:services})
  })
  test("Should update state, when service is added", ()=>{
    const msg = "Service Added!"
    const msgStyle = "text-green-500 text-xl text-center italic"
    const state = servicesReducer({},{
      type: "ADD_SERVICE"
    })
    expect(state).toEqual({msg:msg,msgStyle:msgStyle})

  })
})

describe("Auth Reducer Test", () =>{
  test("Should return default state",()=>{
    const state = authReducer(undefined,{})
    expect(state).toEqual({isLoggedIn: false, user: null })
 })
 test("Should update state, on succesful registration",()=>{
  const state = authReducer({},{
    type: "REGISTER_SUCCESS"
  })
  expect(state).toEqual({isLoggedIn: false, registerError:false })
})


})




