import { Category, SubCategory, User } from "../types"
import { InitialType } from "./Context"

type ContextAction=
| {type:"login" | "logout" ;payload:User}
| {type:"select_category"; payload:Category}
| {type:"select_subcategory" ; payload:SubCategory}

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
          subcategory:{name:""}
        }
      case "select_category":
        return {...state,category:action.payload,subcategory:{name:""}}
        case "select_subcategory":
          return {...state,subcategory:action.payload}
        default:
          return state
  }
}