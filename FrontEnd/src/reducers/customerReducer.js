const initialState = {
    customers:[],
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
    case'GET_ERRORS':{
      console.log(action.payload)
      if(typeof action.payload === 'undefined'){
        return  Object.assign({}, state, {
          msg: "Server connection is required",
          msgStyle:"text-red-500 text-xl text-center italic"
        })
      }else{
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