const initialState = {
    msgStyle:"text-xl text-center italic"
  }
    
const bookingReducer = (state = initialState,action)=> {
  switch(action.type){
    case'ADD_BOOKING':
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
          msgBook: "Server connection is required",
          msgStyle:"text-red-500 text-xl text-center italic"
        })
      }else{
        return  Object.assign({}, state, {
          msgBook: action.payload.data,
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