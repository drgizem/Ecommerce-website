import { useContext, useState } from "react"
import { Button, Container, Form,Card, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { NewUser } from "../types/types"
import { auth } from "../firebase/firebase"
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { Context } from "./Context"
import "../styles/Login.css"
import signup from "../signup.png"
import {setDoc,doc} from "firebase/firestore"
import {db} from "../firebase/firebase"



export const Signup=()=>{
  const [user,setUser]=useState<NewUser>({} as NewUser)
  const {dispatch}=useContext(Context)
  const navigate=useNavigate()
  const [validate,setValidate]=useState(false)
  const [error,setError]=useState(false)

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setUser((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const handleSignup=(e:any)=>{
    e.preventDefault()
    setValidate(true)
    createUserWithEmailAndPassword(auth,user.email,user.password)
    .then(()=>{
      updateProfile(auth.currentUser!,{
        displayName:user.name
      })
    })
    .then(()=>{
      dispatch({
        type:"login",payload:{
          name:auth.currentUser?.displayName,
          email:auth.currentUser?.email,
          id:auth.currentUser?.uid,
          photoUrl:auth.currentUser?.photoURL
        }
      })
    })
    .then(()=>{
      setDoc(doc(db,"users",`${auth.currentUser!.uid}`),{
        name:auth.currentUser?.displayName,
        email:auth.currentUser?.email,
        id:auth.currentUser?.uid,
        photoUrl:auth.currentUser?.photoURL,
        cart:[],
        address:[],
        orders:[]
      })
    })
    .then(()=>navigate("/"))
    .catch((error)=>{
      console.log(error.message)
      error.message.includes("weak-password") && setError(true)
    })
  }
  const handleGoogle=()=>{
    const provider=new GoogleAuthProvider()
    signInWithPopup(auth,provider)
    .then(()=>navigate("/"))
  }
  return (
  <Container>
    <Row>
      <Col>
      <div className="login-card">
      <Form noValidate validated={validate} onSubmit={handleSignup}>
      <h1 className="login-title">Sign up</h1>
      <Form.Control required className="mt-3" type="text" placeholder="User name" value={user.name || ""} name="name" onChange={handleChange}/>
      <Form.Control required className="mt-3" type="email" placeholder="Email" value={user.email || ""} name="email" onChange={handleChange}/>
      <Form.Control required className="mt-3" type="password" placeholder="Password" style={error ? {borderColor:"red", backgroundImage:"none"} : {borderColor:"#ced4da"}} value={user.password || ""} name="password" onChange={handleChange}/>
      {error && <Form.Text className="text-danger">Password should be at least 6 characters!</Form.Text>}
      <Button type="submit" className="signin-btn">Sign up</Button>
    </Form>
    <hr/>
    <Card className="mt-4 google-card" onClick={handleGoogle}>
      <Card.Body className="google"><img className="google-img" src={signup} alt=""/>Continue with Google</Card.Body>
    </Card>
      </div>
      </Col>
    </Row>
    </Container>
  )
}