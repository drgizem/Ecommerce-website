import { useContext, useEffect, useState } from "react"
import { Context } from "./Context"
import { Product } from "../types/types"
import { Container, Row,Col, Button,Form } from "react-bootstrap"
import "../styles/Product.css"
import {getDoc,doc,setDoc} from "firebase/firestore"
import {db} from "../firebase/firebase"


export const Productpart=()=>{
  const {state,dispatch}=useContext(Context)
  const [count,setCount]=useState("1")
  const [product,setProduct]=useState<Product>({} as Product)
  
  useEffect(()=>{
    setProduct(state.product)
  },[])
  const handleAdd=async(product:Product)=>{
    if(state.user.email !==""){
      const userRef=doc(db,"users",`${state.user.id}`)
      const listRef=await getDoc(userRef)
      const dbList=listRef.data()
      const newUser={...dbList}
    const index=newUser.cart.findIndex((item:any)=>item.id===product.id)
    if(index===-1){
      let newPro={
        id:product.id,
        count:Number(count),
        price:product.price,
        stock:product.stock,
        title:product.title,
        image:product.image}
      const newCart=[...newUser.cart,newPro]
      newCart[newUser.cart.length]=newPro
      newUser.cart=newCart
      setDoc(userRef,{...dbList,cart:newCart})
    } else {
      const oldPro=newUser.cart[index]
      const newPro={...oldPro,count:oldPro.count+1}
      const newCart=[...newUser.cart]
      newCart[index]=newPro
      newUser.cart=newCart
      setDoc(userRef,{...dbList,cart:newCart})
    }
    dispatch({
      type:"add_cart",payload:newUser.cart
    })
    }else {
      const index=state.cart.findIndex((item:any)=>item.id===product.id)
      if(index===-1){
        let newPro={
          id:product.id,
          count:Number(count),
          price:product.price,
          stock:product.stock,
          title:product.title,
          image:product.image}
        const newCart=[...state.cart,newPro]
        newCart[newCart.length-1]=newPro
        state.cart=newCart
        dispatch({
          type:"add_cart",payload:newCart
        })
      } else {
        const newCart=[...state.cart]
        const oldPro=newCart[index]
        const newPro={...oldPro,count:oldPro.count+1}
        newCart[index]=newPro
        state.cart=newCart
        dispatch({
          type:"add_cart",payload:newCart
        })
      }
    }
  }
const onChangeCount=(e:any)=>{
  setCount(e.target.value)
  Number(e.target.value) <2 && setCount("1")
}
  return (
    <Container className="mt-5">
      <Row className="poduct">
        <Col>
        <img src={product.image} alt="" style={{maxWidth:"400px",height:"500px"}}/>
        </Col>
        <Col>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        </Col>
        <Col sm={3}>
        <h1>${product.price}</h1>
        <Row className="product-cartpart">
        <Form className="cartpart-input"><Form.Control type="number" placeholder="1" onChange={onChangeCount} value={count}/></Form>
        <Button className="cartpart-btn" onClick={()=>handleAdd(product)}>Add to Cart</Button>
        </Row>
        </Col>
      </Row>
    </Container>
  )
}