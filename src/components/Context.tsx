import { createContext } from "react"
import { useReducer,useEffect } from "react"
import { Reducer } from "./Reducer"
import { Category, Product, SubCategory } from "../types"

export type InitialType={
  user:{
  name:string,
  email:string,
  id:string,
  photoUrl:string,
  cart:Product[]
  },
  category:Category,
  subcategory:SubCategory,
  product:Product,
  query:string
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
   subcategory:{name:""},
   product:{id:"",
    title:"",
    description:"",
    image:"",
    price:0,
    category:0,
    subcategory:0,
    stock:0},
    query:""
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