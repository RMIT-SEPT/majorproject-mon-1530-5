const initialState = {
  services:[],
  msg:"",
  msgStyle:""
}
  
  const servicesReducer = (state =initialState,action)=> {
    switch(action.type){
      case'GET_SERVICE':{
        console.log(action.response)
        return  Object.assign({}, state, {
          services:action.response
        }) 
      }
      case'ADD_SERVICE':{
        console.log(action.response)
        return  Object.assign({}, state, {
          msg: "Service Added!",
          msgStyle:"text-green-500 text-xl text-center italic"
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
      case'RESET':
      return Object.assign({}, state, {
        msg:""
      })
      default:
        return state
    }
  }
  export default servicesReducer;