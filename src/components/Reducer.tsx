import { CartProduct, Category, Product, SubCategory, User } from "../types/types"
import { InitialType } from "./Context"

type ContextAction=
| {type:"login" | "logout" ;payload:User}
| {type:"select_category"; payload:Category}
| {type:"select_subcategory" ; payload:SubCategory}
| {type:"select_product" ; payload:Product}
| {type:"search_query";payload:string}
| {type:"clear_cart" ;payload:CartProduct[]}
| {type:"add_cart" ;payload:CartProduct[]}
| {type:"remove_cart" ; payload:CartProduct[]}
| {type:"calculate_total";payload:number}


export const Reducer=(state:InitialType,action:ContextAction)=>{
  switch (action.type){
    case "login":
      return {...state,user:action.payload}
      case "logout":
        return {user:{
          name:"",
          email:"",
          id:"",
          photoUrl:""
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
          cart:[],
          totalPrice:0
        }
      case "select_category":
        return {...state,category:action.payload,subcategory:{name:""}}
        case "select_subcategory":
          return {...state,subcategory:action.payload}
        case "select_product":
          return {...state,product:action.payload}
          case "clear_cart":
          return {...state,cart:action.payload}
          case "add_cart":
          return {...state,cart:action.payload}
          case "remove_cart":
          return {...state,cart:action.payload}
          case "calculate_total":
          return {...state,totalPrice:action.payload}
        default:
          return state
  }
}