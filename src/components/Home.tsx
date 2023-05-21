import { useEffect, useState } from "react"
import { Row,Col, Nav } from "react-bootstrap"
import { Category } from "../types"
import { getCategory, getSubCategory } from "../firebase/ref"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom"



export const Home=()=>{
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [hover,setHover]=useState(false)
  const [subCat,setSubCat]=useState<Category[]>([])
  const navigate=useNavigate()

  useEffect(()=>{
   const uploadCat=async()=>{
      const fetchedCat=await getCategory()
      setCategoryList(fetchedCat)
   }
   uploadCat()
  },[])
  const handleSubCat=async(id:string)=>{
    setHover(true)
    const fetchSub=await getSubCategory(id)
    setSubCat(fetchSub)
  }
  return (
    <Row>
      <Col xs={2} className="m-0 p-0">
        <Nav className="sidebar">
          {categoryList.map((category,key)=>{
            return <Nav.Link className="sidebar-item" onClick={()=>navigate(`/${category.name}`)} onMouseOut={()=>setHover(false)}  onMouseOver={()=>handleSubCat(category.id)} key={category.id} style={{color:"#0a090cff"}} >{category.name}</Nav.Link>
          })}
        </Nav>
      </Col>
      {hover && <Col xs={2} className="m-0 p-0" ><Nav className="sidebar-sub">
             {subCat.map((item)=>{
              return <Nav.Link onClick={()=>navigate(`/${item.name}`)} onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className="sidebar-subitem" style={{color:"#0a090cff"}}>{item.name}</Nav.Link>
             })}
            </Nav></Col>
          } 
    </Row>
  )
}