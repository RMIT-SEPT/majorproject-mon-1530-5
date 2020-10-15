const initialState = {
    msgBook:"",
    msgStyle:"text-xl text-center italic",
    occBookings:[],
    pastBookings:[],
  }
    
const bookingReducer = (state = initialState,action)=> {
  switch(action.type){
    case'ADD_BOOKING':
      console.log(action.response)
      return  Object.assign({}, state, {
        msgBook: action.response,
        msgStyle:"text-green-500 text-xl text-center italic"
      })
    case'CANCEL_BOOKING':
      console.log(action.response)
      return  Object.assign({}, state, {
        msgBook: action.response,
        msgStyle:"text-green-500 text-xl text-center italic"
      })
    case'GET_OCC_BOOKINGS':{
      console.log(action.response)
      return  Object.assign({}, state, {
        occBookings:action.response
      })
    }
    case'GET_PAST_BOOKINGS':{
      console.log(action.response)
      return  Object.assign({}, state, {
        pastBookings:action.response
      })
    }
    case'GET_ERRORS':{
      console.log(action.payload)
      if(typeof action.payload === 'undefined'){
        return  Object.assign({}, state, {
          msg: "Server connection is required",
          msgStyle:"text-red-500 text-xl text-center italic"
        })
      } else if (typeof action.payload.data === 'undefined') {
        return  Object.assign({}, state, {
          msg: "Session timed out. Please relog.",
          msgStyle:"text-red-500 text-xl text-center italic"
        }) 
      } else if (action.payload.data.error === "Unauthorized") {
        return  Object.assign({}, state, {
          msg: "Session timed out. Please relog.",
          msgStyle:"text-red-500 text-xl text-center italic"
        })
      } else {
        return  Object.assign({}, state, {
          msg: action.payload.data,
          msgStyle:"text-red-500 text-xl text-center italic"
        })
      }
    }
    case"RESET":
      return Object.assign({}, state, {
        msgBook:""
      })
    default:
      return state
  }
}
export default bookingReducer ;