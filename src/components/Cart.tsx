import {useContext, useEffect, useState} from "react"
import { CartProduct } from "../types/types"
import { Context } from "./Context"
import { Button, Card, Container, Row } from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/Cart.css"
import {getDoc,doc,setDoc,onSnapshot} from "firebase/firestore"
import {db} from "../firebase/firebase"

export const Cart=()=>{
  const [cart,setCart]=useState<CartProduct[]>([])
  const {state,dispatch}=useContext(Context)
  
  useEffect(()=>{
    if(state.user.email !==""){
    const userRef=doc(db,"users",`${state.user!.id}`)
    const unSubscribe=onSnapshot(userRef,(doc)=>{
      const dbList=doc.data()
      const list=dbList!.cart
      setCart(list)
    })
    return ()=>unSubscribe()
  }
},[state.user])
useEffect(()=>{
  if(state.user.email ===""){
    setCart(state.cart)
  }
},[])

  const handleClear=async()=>{
    dispatch({
      type:"clear_cart",payload:[]
    })
    setCart([])
    if(state.user.name !==""){
      const userRef=doc(db,"users",`${state.user.id}`)
      const listRef=await getDoc(userRef)
      const dbList=listRef.data()
      setDoc(userRef,{...dbList,cart:[]})
    }
  }
  const handleRemove=async(id:string)=>{
    const newCart=cart.filter((item)=>{
      return item.id !==id
    })
    console.log(newCart)
    dispatch({
      type:"remove_cart",payload:newCart
    })
    setCart(newCart)
    if(state.user.name !==""){
      const userRef=doc(db,"users",`${state.user.id}`)
      const listRef=await getDoc(userRef)
      const dbList=listRef.data()
      setDoc(userRef,{...dbList,cart:newCart})
    }
  }

console.log(state.cart)
  return (
<Container>
    <Row className="mt-5">
    {cart.length===0 ? <div>No Cart Item</div> :
    cart.map((item)=>{
      return <Card className="cart-product mt-2" key={item.id}>
        <Card.Img alt="" src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
        <Card.Title>{item.title}</Card.Title>
        <Card.Body>{item.count}</Card.Body>
        <Card.Text>${item.price*item.count}</Card.Text>
        <Button className="cart-btn" onClick={()=>handleRemove(item.id)}><DeleteIcon/>Remove</Button>
      </Card>
    })} 
    </Row>
  <Button className="cart-btn mt-5" onClick={handleClear}>Clear Cart</Button>
  <Button className="cart-btn mx-3 mt-5" >Checkout</Button>
  </Container>
  )
}