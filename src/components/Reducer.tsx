import { Category, Product, SubCategory, User } from "../types"
import { InitialType } from "./Context"

type ContextAction=
| {type:"login" | "logout" ;payload:User}
| {type:"select_category"; payload:Category}
| {type:"select_subcategory" ; payload:SubCategory}
| {type:"select_product" ; payload:Product}
| {type:"search_query";payload:string}
| {type:"add_cart";payload:Product}


export const Reducer=(state:InitialType,action:ContextAction)=>{
  switch (action.type){
    case "login":
      return {...state,user:action.payload}
      case "logout":
        return {user:{
          name:"",
          email:"",
          id:"",
          photoUrl:"",
          cart:[]
          },
          category:{id:"",name:""},
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
      case "select_category":
        return {...state,category:action.payload,subcategory:{name:""}}
        case "select_subcategory":
          return {...state,subcategory:action.payload}
        case "select_product":
          return {...state,product:action.payload}
          case "search_query":
          return {...state,query:action.payload}
        case "add_cart":
          return {...state,user:{...state.user,cart:[...state.user.cart,action.payload]}}
        default:
          return state
  }
}