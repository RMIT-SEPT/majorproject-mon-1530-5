
const initialState = {
    startDateTime:"",
    endDateTime:"",
  }
    
    const shiftReducer = (state =initialState,action)=> {
      switch(action.type){
        case'ADD_SHIFT':{
          console.log(action.response)
        }
        case'SET_SHIFT':{
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