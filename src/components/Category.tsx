import { Container, Nav,Card, Row, Button } from "react-bootstrap"
import { getCategoryId, getProductByCategory, getSubCategory} from "../firebase/ref"
import {  Product,SubCategory } from "../types/types"
import "../styles/Category.css"
import { Link, useLoaderData } from "react-router-dom"

type LoadData={
  subCategories:SubCategory[]
  products:Product[]
}

export const Categorypart=()=>{
 
 const loadData =useLoaderData() as LoadData

  return (
    <Container>
    <Nav className="category-subnav">
      {loadData.subCategories.map((item)=>{
        return <Link to={`/subcategories/${item.name}`} style={{textDecoration:"none"}}><div className="category-subnavitem mt-2" style={{color:"#0a090cff"}} key={item.name}>{item.name}</div></Link>
      })}
    </Nav>
    <hr/>
    <Row className="products-row">
    {loadData.products.map((item)=>{
      return (
      <Card className="product-card">
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

export const CategoryLoader = async ({params}:any) => {
 
  const {name}=params
  let id:string = await getCategoryId(name)
  let subCategories:SubCategory[]=[] 
  let products:Product[]=[]
  subCategories= await getSubCategory(id)
  products= await getProductByCategory(id,name)
  return {subCategories,products}
};
