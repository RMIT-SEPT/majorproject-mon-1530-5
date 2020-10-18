const initialState = {
    customers:[],
    customer:"",
    msg:"",
    msgStyle:"text-xl text-center italic"
  }
    
const customerReducer = (state = initialState,action)=> {
  switch(action.type){
    case'GET_CUSTOMERS':{
      console.log(action.response)
      return  Object.assign({}, state, {
        customers:action.response
      })
    }
    case'UPDATE_DETAILS':{
      console.log(action.response)
      return Object.assign({}, state, {
        msg:"Details Updated!",
        msgStyle:"text-green-500 text-xl text-center italic"
      })
    }
    case"CHANGE_PASSWORD":
      console.log(action.response)
      return  Object.assign({}, state, {
        msg:action.response,
        msgStyle:"text-green-500 text-xl text-center italic"
      })
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
        msg:""
      })
    default:
      return state
  }
}
export default customerReducer ;