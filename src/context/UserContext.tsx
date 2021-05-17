import React from "react";

var UserStateContext = React.createContext(null);
var UserDispatchContext = React.createContext(null);

function userReducer(state: any, action: { type: any; }) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }:any) {
  var [state, dispatch]:any = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("user"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch || null}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch: { (defaultValue: any): void; (arg0: { type: string; }): void; }, user: any, history: string[], setIsLoading: { (value: any): void; (arg0: boolean): void; }, setError: { (value: any): void; (arg0: boolean | null): void; }) {
  setError(false);
  setIsLoading(true);

  localStorage.setItem('user', JSON.stringify(user))
  setError(null)
  setIsLoading(false)
  dispatch({ type: 'LOGIN_SUCCESS' })
  history.push('/app/dashboard')
}

function signOut(dispatch: { (defaultValue: any): void; (arg0: { type: string; }): void; }, history: string[]) {
  localStorage.removeItem("user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
// function defaultValue(defaultValue: any) {
//   throw new Error("Function not implemented.");
// }

