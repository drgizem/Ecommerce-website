import {useContext, useEffect, useState} from "react"
import { CartProduct } from "../types/types"
import { Context } from "./Context"
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/Cart.css"
import {getDoc,doc,setDoc,onSnapshot} from "firebase/firestore"
import {db} from "../firebase/firebase"
import { useNavigate } from "react-router-dom";

export const Cart=()=>{
  const [cart,setCart]=useState<CartProduct[]>([])
  const [selectItem,setSelectItem]=useState<CartProduct>({} as CartProduct)
  const [count,setCount]=useState<number | null>(selectItem ? selectItem.count : null)
  const {state,dispatch}=useContext(Context)
  const navigate=useNavigate()
  
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
  } // eslint-disable-next-line
},[]) 
useEffect(()=>{
  const changeItem=async()=>{
    setSelectItem((pre:any)=>{
    return {...pre,count:count!>=selectItem.stock ? selectItem.stock : count}
  })
  if(state.user.email !==""){
    const userRef=doc(db,"users",`${state.user.id}`)
    const listRef=await getDoc(userRef)
    const dbList=listRef.data()
    const newUser={...dbList}
  const index=newUser.cart.findIndex((item:any)=>item.id===selectItem!.id)
    const oldPro=newUser.cart[index]
    const newPro={...oldPro,count:Number(count)}
    const newCart=[...newUser.cart]
    newCart[index]=newPro
    newUser.cart=newCart
    setDoc(userRef,{...dbList,cart:newCart})
  dispatch({
    type:"add_cart",payload:newUser.cart
  })
  }else {
    const index=state.cart.findIndex((item:any)=>item.id===selectItem!.id)
      const newCart=[...state.cart]
      const oldPro=newCart[index]
      const newPro={...oldPro,count:Number(count)}
      newCart[index]=newPro
      state.cart=newCart
      dispatch({
        type:"add_cart",payload:newCart
      })
  }
  }
  changeItem() // eslint-disable-next-line
},[count])

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
const handleSelect=(item:CartProduct)=>{
  setSelectItem(item)
}
const onChangeCount=async(e:any)=>{
  setCount(e.target.value)
  Number(e.target.value) <1 && setCount(0)
  Number(e.target.value) >= selectItem.stock && setCount(selectItem.stock)
}
const calculatePrice=()=>{
  const priceArr=state.cart.map((item,index)=>{
    return item.price*state.cart[index].count
  })
  let total=0
  for(let i=0;i<priceArr.length;i++){
    total+=priceArr[i]
  }
  return total
}

  return (
<Container>
    <Row className="mt-5">
    {cart.length===0 ? <div>No Cart Item</div> :
    cart.map((item:CartProduct,index)=>{
      return <Card className="cart-product mt-2" key={item.id} onMouseOver={()=>handleSelect(item)}>
        <Card.Img alt="" src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
        <Card.Title>{item.title}</Card.Title>
        <Form.Control type="number" placeholder={String(state.cart[index].count)} className="cart-counter mb-3"  onChange={onChangeCount} value={String(state.cart[index].count)}/> 
         <Card.Text>${item.price*state.cart[index].count}</Card.Text>
        <Button className="cart-btn" onClick={()=>handleRemove(item.id)}><DeleteIcon/>Remove</Button>
      </Card>
    })} 
    </Row>
    {calculatePrice() >0 && <><div className="mt-4">Total Price: ${calculatePrice()}</div>
  <Button className="cart-btn mt-5" onClick={handleClear}>Clear Cart</Button>
  <Button className="cart-btn mx-3 mt-5" onClick={()=>navigate("/checkout")} >Checkout</Button></>} 
  </Container>
  )
}