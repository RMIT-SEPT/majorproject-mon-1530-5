import AuthService from "../services/authServices";


export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data },
        });
       console.log(data)
      },
    ).catch((error) =>{
            dispatch({
                type: "LOGIN_FAIL",
              });
            dispatch({
                type: "GET_ERRORS",
                payload: error.response
            })
    })
    
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: "LOGOUT",
    });
  };