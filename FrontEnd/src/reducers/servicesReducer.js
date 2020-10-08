
const initialState = {
  services:[]
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
          msgBook: action.response,
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
        }else{
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