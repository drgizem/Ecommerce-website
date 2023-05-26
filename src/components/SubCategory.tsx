import { Card,Button, Row, Container } from "react-bootstrap"
import { SubCategory, Product } from "../types"
import { useContext, useEffect, useState } from "react"
import { getProducts } from "../firebase/ref"
import { Context } from "./Context"
import { Link } from "react-router-dom"
import "../styles/Category.css"


type Props={
  subcategory:SubCategory,
}
export const SubCategorypart=({subcategory}:Props)=>{
  const [productList,setProductList]=useState<Product[]>([])
  const {state,dispatch}=useContext(Context)


useEffect(()=>{
  const upload=async()=>{
    const fetch=await getProducts(state.category.name,state.subcategory.name)
    setProductList(fetch)
  }
  upload()
},[])
const onSelectPro=(item:Product)=>{
  dispatch({
    type:"select_product",payload:item
  })
}

  return (
      <Container className="mt-5">
        <Row className="products-row">
      {productList.map((item)=>{
        return <>
        <Card className="product-card">
          <Card.Img  src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
          <Card.Title className="product-title">{item.title}</Card.Title>
          <Card.Text className="product-price">{item.price}$</Card.Text>
          <Link to={`/${item.title}`}><Button className="product-btn" onClick={()=>onSelectPro(item)}>Go to product</Button></Link>
        </Card></>
      })}
      </Row>
      </Container>
  )
}