
import employeeReducer from '../reducers/employeeReducer';
import servicesReducer from '../reducers/servicesReducer'
import { types } from '../actions/types'
import authReducer from '../reducers/authReducer';
import customerReducer from '../reducers/customerReducer';
import bookingReducer from '../reducers/bookingReducer'
import shiftReducer from '../reducers/shiftReducer'

describe("Employee Reducer Tests",()=>{
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
 test("Should update state, on unsuccesful registration",()=>{
  let message = "Fail"
  const state = authReducer({},{
    type: "REGISTER_FAIL",
    payload: message
  })
  expect(state).toEqual({isLoggedIn: false, registerError:message })
  
 })
 test("Should update state, when user logs in",()=>{
  let user = {username:"username",password:"password",name:"name"}
  const state = authReducer({},{
    type: "LOGIN_SUCCESS",
    payload: {user:user}
  })
  expect(state).toEqual({isLoggedIn: true,loginError: false, user})
  
 })
 test("Should update state, on logout",()=>{
  const state = authReducer({},{
    type: "LOGOUT"
  })
  expect(state).toEqual({isLoggedIn: false, user: null })
  
 })

})

describe("Customer Reducer Test", () =>{
  test("Should return default state",()=>{
    const state = customerReducer(undefined,{})
    expect(state).toEqual({ customers:[],
      customer:"",
      msg:"",
      msgStyle:"text-xl text-center italic" })
 })
 test("Should return customers",()=>{
  const customers = [{username:"username",password:"password",name:"name"}, {username:"username1",password:"password1",name:"name1"}]
  const state = customerReducer({},{
    type: "GET_CUSTOMERS",
    response:customers
  })
  expect(state).toEqual({ customers:customers})
})

test("Should update state, on update details",()=>{
  let msg ="Details Updated!"
  const state = customerReducer({},{
    type: "UPDATE_DETAILS"
  })
  expect(state).toEqual({msg:msg,
  msgStyle:"text-green-500 text-xl text-center italic"})
})

test("Should update state, on chage password",()=>{
  let msg ="Details Updated!"
  const state = customerReducer({},{
    type: "CHANGE_PASSWORD",
    response:msg
  })
  expect(state).toEqual({msg:msg,
  msgStyle:"text-green-500 text-xl text-center italic"})
})
})

describe("Booking Reducer Test", () =>{
  test("Should return default state",()=>{
    const state = bookingReducer(undefined,{})
    expect(state).toEqual({ msgBook:"",
    msgStyle:"text-xl text-center italic",
    occBookings:[],
    pastBookings:[], })
 })
 test("Should update state, on add booking",()=>{
  let msg = "Booking Added!"
  const state = bookingReducer({},{
    type: "ADD_BOOKING",
    response:msg
  })
  expect(state).toEqual({ msgBook: msg,
    msgStyle:"text-green-500 text-xl text-center italic"})
})
test("Should update state, on cancel booking",()=>{
  let msg = "Booking Added!"
  const state = bookingReducer({},{
    type: "CANCEL_BOOKING",
    response:msg
  })
  expect(state).toEqual({ msgBook: msg,
    msgStyle:"text-green-500 text-xl text-center italic"})
})
test("Should return occupied bookings ",()=>{
  let occBookings = []
  const state = bookingReducer({},{
    type: "GET_OCC_BOOKINGS",
    response:occBookings
  })
  expect(state).toEqual({ occBookings })
})
test("Should return past bookings ",()=>{
  let pastBookings = []
  const state = bookingReducer({},{
    type: "GET_PAST_BOOKINGS",
    response:pastBookings
  })
  expect(state).toEqual({ pastBookings })
})
})

describe("Shift Reducer Test", () =>{
  test("Should return default state",()=>{
    const state = shiftReducer(undefined,{})
    expect(state).toEqual({ startDateTime:"",
    endDateTime:"",
    msgStyle:"text-xl text-center italic",
    msg:"",
    shifts:[] })
 })
 test("Should return list of shifts",()=>{
  let shifts = []
  const state = shiftReducer({},{
    type: "GET_SHIFT",
    response:shifts
  })
  expect(state).toEqual({ shifts })
})
})

