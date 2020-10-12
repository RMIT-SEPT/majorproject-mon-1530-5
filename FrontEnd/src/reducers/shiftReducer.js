
const initialState = {
    startDateTime:"",
    endDateTime:"",
    msgStyle:"text-xl text-center italic",
    msg:"",
    shifts:[]
  }
    
    const shiftReducer = (state =initialState,action)=> {
      switch(action.type){
        case'GET_SHIFT':{
          console.log(action.response)
          return  Object.assign({}, state, {
            shifts:action.response
          })
        }
        case'ADD_SHIFT':
          console.log(action.response)
          return  Object.assign({}, state, {
            msg: action.response,
            msgStyle:"text-green-500 text-xl text-center italic"
          })
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
    export default shiftReducer ;