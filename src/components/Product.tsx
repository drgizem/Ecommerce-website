import { useContext, useState } from "react"
import { Context } from "./Context"
import { Product } from "../types/types"
import { Container, Row,Col, Button,Form } from "react-bootstrap"
import "../styles/Product.css"
import {getDoc,doc,setDoc} from "firebase/firestore"
import {db} from "../firebase/firebase"
import { useLoaderData } from "react-router-dom"

export const Productpart=()=>{
  const {state,dispatch}=useContext(Context)
  const [count,setCount]=useState("1")
  
  const loadData =useLoaderData() as {product:Product}


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
      <Row className="product">
        <Col xs={12} md={6}>
        <img src={loadData.product.image} alt="" style={{maxWidth:"400px",height:"500px"}}/>
        </Col>
        <Col className="mt-5">
        <h1>{loadData.product.title}</h1>
        <p>{loadData.product.description}</p>
        <h1>${loadData.product.price}</h1>
        <Row className="product-cartpart">
        <Form className="cartpart-input"><Form.Control type="number" placeholder="1" onChange={onChangeCount} value={count}/></Form>
        <Button className="cartpart-btn" onClick={()=>handleAdd(loadData.product)}>Add to Cart</Button>
        </Row>
        </Col>
      </Row>
    </Container>
  )
}

export const ProductLoader = async ({params}:any) => {
  const {id}=params
  let product:Product={} as Product
  const docRef=doc(db,"products",`${id}`)
  const docSnap=await getDoc(docRef)
  if(docSnap.exists()){
    product=docSnap.data() as Product
  }
  return {product}
}