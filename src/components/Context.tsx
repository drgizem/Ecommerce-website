import { createContext } from "react"
import { useReducer,useEffect } from "react"
import { Reducer } from "./Reducer"

export type InitialType={
  user:{
  name:string,
  email:string,
  id:string,
  photoUrl:string
  }
}
export const INITIAL_STATE:InitialType=JSON.parse(localStorage.getItem("user") || "null") || {
  user:{
    name:"",
    email:"",
    id:"",
    photoUrl:""
    }
}
export const Context = createContext<{
  state: InitialType;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null
});
export const ContextProvider=({children}:{ children: React.ReactNode })=>{
  const[state,dispatch]=useReducer(Reducer,INITIAL_STATE)

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state))
  },[state])
 
  
  return (
    <Context.Provider value={{dispatch,state}}>{children}</Context.Provider>
  )
}