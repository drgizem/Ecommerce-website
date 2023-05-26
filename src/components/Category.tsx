import { Container, Nav,Card, Row, Button } from "react-bootstrap"
import { getProductByCategory, getSubCategory} from "../firebase/ref"
import { Product,SubCategory } from "../types"
import {useEffect, useState,useContext} from "react"
import "../styles/Category.css"
import { Link } from "react-router-dom"
import { Context } from "./Context"



export const Categorypart=()=>{
  const [productList,setProductList]=useState<Product[]>([])
  const [subCategoryList,setSubCategoryList]=useState<SubCategory[]>([])
  const {state,dispatch}=useContext(Context)

 
  useEffect(()=>{
    const upload=async()=>{
      const fetch=await getProductByCategory(state.category.id,state.category.name)
      const fetSub=await getSubCategory(state.category.id)
      setSubCategoryList(fetSub)
      setProductList(fetch)
    }
    upload()
  },[])

const handleClick=(name:string)=>{
  const select=subCategoryList.find((item)=>item.name===name)
  dispatch({
    type:"select_subcategory",payload:select
  })
}
const onSelectPro=(item:Product)=>{
  dispatch({
    type:"select_product",payload:item
  })
}
  return (
    <Container>
    <Nav className="category-subnav">
      {subCategoryList.map((item)=>{
        return <Link to={`/${item.name}`} style={{textDecoration:"none"}}><div className="category-subnavitem mt-2" style={{color:"#0a090cff"}} onClick={()=>handleClick(item.name)} key={item.name}>{item.name}</div></Link>
      })}
    </Nav>
    <hr/>
    <Row className="products-row">
    {productList.map((item)=>{
      return (
      <Card className="product-card">
        <Card.Img  src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
        <Card.Title className="product-title">{item.title}</Card.Title>
        <Card.Text className="product-price">{item.price}$</Card.Text>
        <Link to={`/${item.title}`}><Button className="product-btn" onClick={()=>onSelectPro(item)}>Go to product</Button></Link>
      </Card>)
    })}
    </Row>
    </Container>
  )
} 