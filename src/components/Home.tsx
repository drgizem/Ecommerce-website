
import ProductCarousel from "./Carousel"
import {  useEffect, useState } from "react"
import { Row,Col } from "react-bootstrap"
import "../styles/Home.css"
import  Sidebar  from "./Sidebar"
import Featured from "./Featured"
import Swipe from "./Swipe"

export const Home=()=>{
  const[width,setWidth]=useState<number>(window.innerWidth)

  useEffect(()=>{
    window.addEventListener("resize",()=>setWidth(window.innerWidth))
  }
  ,[width])

  return (
   <>
    <Row className="carousel-sidebar">
      { width>1070 ? <Col md={3} className="sidebar-cont">
        <Sidebar />
        </Col>:null
      }
      <Col xs={11} lg={9} className="carousel">
        <ProductCarousel/>
      </Col>
    </Row>
    <Row className="swipe-cont mx-5">
      <Swipe/>
    </Row>
    <Row className="featured mt-5 mb-5 mx-3">
      <Featured/>
    </Row>
   </>

  )

}

