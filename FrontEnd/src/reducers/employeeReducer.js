

const initialState = {
  employees:[],
  availability:[]
}

const employeeReducer = (state = initialState,action)=> {
  switch(action.type){
    case'GET_EMPLOYEES': 
    console.log(action.response)
    return Object.assign({}, state, {
      employees: action.response
    })
    case'ADD_AVAILABILITY':
    console.log(action.response)
    return Object.assign({},state, {
      msgBook: action.response,
      msgStyle:"text-green-500 text-xl text-center italic"
    })
    case'REMOVE_AVAILABILITY':
    console.log(action.response)
    return Object.assign({},state, {
      msgBook: action.response,
      msgStyle:"text-green-500 text-xl text-center italic"
    })
    case'GET_AVAILABILITY': 
    console.log(action.response)
    return Object.assign({}, state, {
      availability: action.response
    })
    case'CREATE_EMPLOYEE':{
      console.log(action.employee)
      return Object.assign({}, state, {
        authError:false
      })
    }
    case'ASSIGN_SERVICE':{
      console.log(action.response)
      return Object.assign({}, state, {
        msg: action.response,
        msgStyle:"text-green-500 text-xl text-center italic"
      })
    }
    case'GET_ERRORS':{
      console.log(action.payload)
      if(typeof action.payload === 'undefined'){
        return  Object.assign({}, state, {
          authError: "Server connection is required"
        })
      }else{
        return  Object.assign({}, state, {
          authError: action.payload.data,
        })
      }
    }
    case'RESET':
    return Object.assign({}, state, {
      authError:""
    })
    
    default:
      return state
  }
}
export default employeeReducer;