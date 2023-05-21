import { Card } from "react-bootstrap"
import { Category, Product } from "../types"
import { useEffect } from "react"

type Props={
  subcategory:Category,
  productList:Product[],
  getProducts():void
}
export const SubCategory=({subcategory,productList,getProducts}:Props)=>{

  useEffect(()=>{
    getProducts()
    },[])

  return <div>
    <div>{subcategory.name}</div>
    {productList.map((product)=>{
      return <Card >
        <Card.Img style={{width:"200px",height:"200px"}} variant="top" src={product.image}/>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card>
    })}
  </div>
}