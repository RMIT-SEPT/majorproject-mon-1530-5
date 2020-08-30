

const initialState = {
  employees:[],
  authError:false
}

const employeeReducer = (state =initialState,action)=> {
  switch(action.type){
    case'SEARCH_EMPLOYEE':{
      return action.response
    }
    case'CREATE_EMPLOYEE':{
      console.log(action.employee)
      return Object.assign({}, state, {
        authError:false
      })
    }
    case'GET_ERRORS':{
      console.log(action.payload)
      return Object.assign({}, state, {
        authError:true
      })
    }
    default:
      return state
  }
}
export default employeeReducer;