
import { useContext, useEffect, useState } from "react"
import { Row,Col, Nav } from "react-bootstrap"
import { Category, SubCategory } from "../types"
import { getCategory, getSubCategory } from "../firebase/ref"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom"
import { Context } from "./Context"


export const Home=()=>{
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [hover,setHover]=useState(false)
  const [subCat,setSubCat]=useState<SubCategory[]>([])
  const [selectCat,setSelectCat]=useState<Category>({} as Category)
  const [selectSubCat,setSelectSubCat]=useState<SubCategory>({} as SubCategory)
  const {state,dispatch}=useContext(Context)
  const navigate=useNavigate()

  useEffect(()=>{
   const uploadCat=async()=>{
      const fetchedCat=await getCategory()
      setCategoryList(fetchedCat)
   }
   uploadCat()
  },[])
  const handleCat=async(id:string)=>{
    setHover(true)
    const fetchSub=await getSubCategory(id)
    setSubCat(fetchSub)
    const select=categoryList.find((item)=>item.id===id)
    setSelectCat(select!)
    dispatch({
      type:"select_category",payload:select
    })
  }
  const onHoverSub=(name:string)=>{
    setHover(true)
    const select=subCat.find((item)=>item.name===name)
    setSelectSubCat(select!)
      dispatch({
        type:"select_subcategory",payload:select
      })
  }

  return (
    <Row>
      <Col xs={2} className="m-0 p-0">
        <Nav className="sidebar">
          {categoryList.map((category,key)=>{
            return <Nav.Link className="sidebar-item" onClick={()=>navigate(`/${category.name}`)} onMouseOut={()=>setHover(false)}  onMouseOver={()=>handleCat(category.id)} key={category.id} style={{color:"#0a090cff"}} >{category.name}</Nav.Link>
          })}
        </Nav>
      </Col>
      {hover && <Col xs={2} className="m-0 p-0" ><Nav className="sidebar-sub">
             {subCat.map((item)=>{
              return <Nav.Link onClick={()=>navigate(`/${item.name}`)} onMouseOver={()=>onHoverSub(item.name)} onMouseOut={()=>setHover(false)} className="sidebar-subitem" style={{color:"#0a090cff"}}>{item.name}</Nav.Link>
             })}
            </Nav></Col>
          } 
    </Row>
  )
}

