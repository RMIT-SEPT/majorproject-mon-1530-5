
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

      case'GET_ERRORS':
        console.log(action.payload)
        return state

      default:
        return state
    }
  }
  export default servicesReducer ;