import { createContext } from "react"
import { useReducer,useEffect } from "react"
import { Reducer } from "./Reducer"
import { Category, SubCategory } from "../types"

export type InitialType={
  user:{
  name:string,
  email:string,
  id:string,
  photoUrl:string,
  cart:CartProduct[]
  },
  category:Category,
  subcategory:SubCategory
}
export type CartProduct={
  id:string,
  quality:string,
  categoryName:string,
  subcategoryName:string
}
export const INITIAL_STATE:InitialType=JSON.parse(localStorage.getItem("user") || "null") || {
  user:{
    name:"",
    email:"",
    id:"",
    photoUrl:"",
    cart:[]
    },
   category:{id:"",name:""} ,
   subcategory:{name:""}
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