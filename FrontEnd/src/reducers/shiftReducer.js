
const initialState = {
    startDateTime:"",
    endDateTime:"",
    error:""
  }
    
    const shiftReducer = (state =initialState,action)=> {
      switch(action.type){
        case'ADD_SHIFT':{
          console.log(action.response)
        }
        case'GET_ERRORS':{
          console.log(action.payload)
        }
        default:
          return state
      }
    }
    export default shiftReducer ;