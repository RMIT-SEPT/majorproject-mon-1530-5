const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case'GET_ERRORS': 
    if(typeof action.payload === 'undefined'){
      return  Object.assign({}, state, {
        ...state,
        authError: "Server connection is required"
      })
    }else{
      return Object.assign({}, state, {
        ...state,
        authError:"Invlavid credentials",
      })
    }

    case'RESET':
    return Object.assign({}, state, {
      ...state,
      authError:""
    })
    
    default:
      return state;
  }
}
