import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { NewUser } from "../types"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { Context } from "./Context"
import { Navigate, useNavigate } from "react-router-dom"
import "../styles/Login.css"

export const Login=()=>{
  const [user,setUser]=useState<NewUser>({} as NewUser)
  const [validate,setValidate]=useState(false)
  const [error,setError]=useState(false)
  const [userError,setUserError]=useState(false)
  const {state,dispatch}=useContext(Context)
  const navigate=useNavigate()
  const [signup,setSignup]=useState(false)

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setUser((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const handleLogin=async(e:any)=>{
    e.preventDefault()
    setValidate(true)
      signInWithEmailAndPassword(auth,user.email,user.password)
    .then((userCredential)=>{
      const user=userCredential.user
      dispatch({
        type:"login",payload:{
          name:user.displayName,
          email:user.email,
          id:user.uid,
          photoUrl:user.photoURL,
        }
      })
    })
    .then(()=>navigate("/"))
    .catch((error:any)=>{
      console.log(error.message)
      error.message.includes("wrong-password") && setError(true)
      error.message.includes("user-not-found") && setUserError(true)
    })
  }
  return (<>
  <Container className="login-card">
    <Form.Check className="signin-check" type="switch" label="Create an account" onChange={()=>setSignup(true)}/>
    {signup && <Navigate to="/signup"/>} 
    <Form validated={validate} onSubmit={handleLogin}>
      <h1 className="login-title">Login</h1>
      <Form.Control required className="mt-3" type="email" placeholder="Email" style={userError ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} value={user.email || ""} name="email" onChange={handleChange}/>
      <Form.Control required className="mt-3" type="password" placeholder="Password" style={error || userError ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} value={user.password || ""} name="password" onChange={handleChange}/>
      {error && <Form.Text className="mt-3 text-danger">Wrong password!</Form.Text>}
      {userError && <Form.Text className="mt-3 text-danger">User is not found!</Form.Text>}
      <Button type="submit" className="signin-btn">Login</Button>
    </Form>
    </Container>
    </>
  )
}