import { useContext, useEffect, useState } from "react"
import { Context } from "./Context"
import { Product,Category,SubCategory } from "../types"
import { Container, Row,Col, Button,Form } from "react-bootstrap"
import { getCategory,getSubCategory } from "../firebase/ref"
import "../styles/Product.css"



export const Productpart=()=>{
  const {state,dispatch}=useContext(Context)
  const [product,setProduct]=useState<Product>({} as Product)
  
  useEffect(()=>{
    setProduct(state.product)
  },[])

  return <>
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
        <Form className="cartpart-input"><Form.Control type="number" placeholder="1" /></Form>
        <Button className="cartpart-btn" >Add to Cart</Button>
        </Row>
        </Col>
      </Row>
    </Container>
  </>
}