import { User } from "../types"
import { InitialType } from "./Context"

type ContextAction=
| {type:"login" | "logout" ;payload:User}

export const Reducer=(state:InitialType,action:ContextAction)=>{
  switch (action.type){
    case "login":
      return {...state,user:action.payload}
      case "logout":
        return {...state,user:{
          name:"",
          email:"",
          id:"",
          photoUrl:""
          }}
        default:
          return state
  }
}