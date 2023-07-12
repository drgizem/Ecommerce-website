import { useContext, useEffect, useState } from "react"
import { CartProduct, Order } from "../types/types"
import {doc,onSnapshot} from "firebase/firestore"
import {db} from "../firebase/firebase"
import { Context } from "./Context"
import { Col, Container, Row } from "react-bootstrap"
import "../styles/Orders.css"

export const Orders=()=>{
  const [orders,setOrders]=useState<Order[]>([])
  const {state}=useContext(Context)

  useEffect(()=>{
    if(state.user.email !==""){
      const userRef=doc(db,"users",`${state.user!.id}`)
      const unSubscribe=onSnapshot(userRef,(doc)=>{
        const dbList=doc.data()
        const list=dbList!.orders
        setOrders(list)
      })
      return ()=>unSubscribe()
    } else{
      setOrders([])
    }// eslint-disable-next-line
  },[])

    return (
      <Container>
        <Row>
          <Col>
          <div className="orders">
            <h1 className="mt-5">Recent Orders</h1>
            {orders.length !==0 ? <ol>
              {orders.map((item:Order,index:number)=>{
                return <li key={index} className="orders-item">
                  <p><strong>ORDER DATE:</strong>{item.date}</p>
                  <p><strong>PRICE:</strong> {item.totalPrice}</p>
                  <Col>
                  {item.orders.map((data:CartProduct,index)=>{
                    return <Col xs={12} sm={4}>
                      <img src={data.image} alt=""/>
                      <p className="mt-3">{data.title}</p>
                      </Col>
                  })}
                  </Col><hr/>
                </li>
              })}
            </ol> : <h3>No Past Orders</h3>}
          </div>
          </Col>
        </Row>
      </Container>
    )
}