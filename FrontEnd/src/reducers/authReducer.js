const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        registerError:false
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        registerError: action.payload
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        loginError: false
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loginError: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case'GET_ERRORS': 
    console.log(action.payload)
    if(typeof action.payload === 'undefined'){
      return  Object.assign({}, state, {
        ...state,
        authError: "Server connection is required"
      })
    }else{
      return state
    }

    case'RESET':
    return Object.assign({}, state, {
      ...state,
      registerError:""
    })
    
    default:
      return state;
  }
}
