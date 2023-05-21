import { Container, Nav } from "react-bootstrap"
import { getProducts} from "../firebase/ref"
import { Category, Product } from "../types"
import {useEffect, useState} from "react"
import "../styles/Category.css"
import { Link } from "react-router-dom"
import { SubCategory } from "./SubCategory"

type Props={
  onFetchSub:()=>void,
  subCat:Category[],
  category:Category
}
export const Categorypart=({onFetchSub,subCat,category}:Props)=>{
  const [productList,setProductList]=useState<Product[]>([])


  useEffect(()=>{
    onFetchSub()
  },[])

  const fetchPro=async(id:string)=>{
      const fetchProduct=await getProducts(category.name,id)
      setProductList(fetchProduct)
   }
console.log(productList)

  return <>
  <Container>
  <Nav className="category-subnav">
    {subCat.map((item)=>{
      return <Link to={`/${item.name}`}><div className="category-subnavitem mt-2" style={{color:"#0a090cff"}} key={item.id}>{item.name}</div></Link>
    })}
  </Nav>
  <hr/>
    {subCat.map((item)=>{
      return <SubCategory subcategory={item} productList={productList} getProducts={()=>fetchPro(item.name)} />
    })}
  </Container>
  </>
} 