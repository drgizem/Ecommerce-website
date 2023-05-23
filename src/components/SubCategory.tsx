import { Card,Button, Row, Col, Container } from "react-bootstrap"
import { SubCategory, Product } from "../types"
import { useContext, useEffect, useState } from "react"
import { getProducts } from "../firebase/ref"
import { Context } from "./Context"
import "../styles/Category.css"


type Props={
  subcategory:SubCategory,
}
export const SubCategorypart=({subcategory}:Props)=>{
  const [productList,setProductList]=useState<Product[]>([])
  const {state}=useContext(Context)

useEffect(()=>{
  const upload=async()=>{
    const fetch=await getProducts(state.category.name,state.subcategory.name)
    setProductList(fetch)
  }
  upload()
},[])

  return <>
      <div>{state.subcategory.name}</div>
      <Container>
        <Row className="products-row">
      {productList.map((item)=>{
        return <>
        <Card className="product-card">
          <Card.Img  src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
          <Card.Title className="product-title">{item.title}</Card.Title>
          <Card.Text className="product-price">{item.price}$</Card.Text>
          <Button className="product-btn">Go to product</Button>
        </Card></>
      })}
      </Row>
      </Container>
  </>

}