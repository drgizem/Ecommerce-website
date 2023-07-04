import { Card,Button, Row, Container } from "react-bootstrap"
import {  Product } from "../types/types"
import { getProducts,getCategoryNameBySubcategory } from "../firebase/ref"
import { Link } from "react-router-dom"
import "../styles/Category.css"
import { useLoaderData } from "react-router-dom"


type LoadData={
  productList:Product[]
}

export const SubCategorypart=()=>{

  const loadData =useLoaderData() as LoadData

  return (
      <Container className="mt-5">
        <Row className="products-row">
      {loadData.productList&&loadData.productList.map((item)=>{
        return (<Card key={item.id} className="product-card">
          <Card.Img  src={item.image} style={{maxWidth:"16rem",height:"200px"}}/>
          <Card.Title className="product-title">{item.title}</Card.Title>
          <Card.Text className="product-price">{item.price}$</Card.Text>
          <Link to={`/products/${item.id}`}><Button className="product-btn">Go to product</Button></Link>
        </Card>)
      })}
      </Row>
      </Container>
  )
}

export const SubCategoryLoader = async ({params}:any) => {
  const {name}=params
  let productList:Product[]=[]
  const category:string= await getCategoryNameBySubcategory(name)

  const fetch=await getProducts(category,name)
  productList=fetch
  return {productList}
}