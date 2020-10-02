

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