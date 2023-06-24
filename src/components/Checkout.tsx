import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap"
import "../styles/Checkout.css"
import { useContext, useEffect, useState } from "react"
import { Context } from "./Context"
import AddIcon from '@mui/icons-material/Add';
import { Checkoutform } from "./Checkoutform";
import { Address } from "../types/types";
import CheckIcon from '@mui/icons-material/Check';
import  dayjs,{Dayjs} from 'dayjs'
import { Payment } from "./Payment";
import {getDoc,doc,setDoc,onSnapshot} from "firebase/firestore"
import {db} from "../firebase/firebase"

let now:Dayjs=dayjs()
let tomorrow=now.add(1,"d").toString().split(" ")
let threedays=now.add(3,"d").toString().split(" ")


export const Checkout=()=>{
const [total,setTotal]=useState<number>(0)
const [delivery,setDelivery]=useState<number>()
const [selectDeli,setSelectDeli]=useState(false)
const [selectExtraDeli,setSelectExtraDeli]=useState(false)
const [form,setForm]=useState(false)
const [addressList,setAddressList]=useState<Address[]>([])
const {state,dispatch}=useContext(Context)
const [select,setSelect]=useState({
  userName:"",
  city:"",
  state:"",
  country:"",
  address:"",
  phone:0,
  zipcode:0,
  addressName:""})
  const [alert,setAlert]=useState(false)

useEffect(()=>{
  const calculate=()=>{
    const priceArr=state.cart.map((item,index)=>{
      return item.price*state.cart[index].count
    })
    let totalprice=0
    for(let i=0;i<priceArr.length;i++){
      totalprice+=priceArr[i]
    }
    setTotal(totalprice)
  }
  calculate() 
},[]) // eslint-disable-next-line
useEffect(()=>{
  if(state.user.email !==""){
  const userRef=doc(db,"users",`${state.user!.id}`)
  const unSubscribe=onSnapshot(userRef,(doc)=>{
    const dbList=doc.data()
    const list=dbList!.address
    setAddressList(list)
    setSelect({} as Address)
    setSelectExtraDeli(false)
    setSelectDeli(false)
  })
  return ()=>unSubscribe() // eslint-disable-next-line
}
},[]) 
useEffect(()=>{
  total<1000 ? setDelivery(15) : setDelivery(0)
},[total])
const onSelect=(item:Address)=>{
  const selectAdd=addressList.find((add)=>add.address===item.address)
  setSelect(selectAdd!)
}

const selectFreeDeli=()=>{
  setDelivery(total<1000 ? 15 : 0)
  setSelectDeli(true)
  setSelectExtraDeli(false)
}
const selectDelivery=()=>{
  setDelivery(39)
  setSelectExtraDeli(true)
  setSelectDeli(false)
}
const onClose=()=>{
  setSelectDeli(false)
  setSelectExtraDeli(false)
}
const onSubmit=async()=>{
  dispatch({
    type:"clear_cart",payload:[]
  })
  const userRef=doc(db,"users",`${state.user.id}`)
  const listRef=await getDoc(userRef)
  const dbList=listRef.data()
  console.log(dbList)
  setDoc(userRef,{...dbList,cart:[]})
  setAlert(true)
}
  return (
    <Container>
      {alert ? <Alert variant="success">Payment is successful! Return <Alert.Link href="/">Home Page</Alert.Link></Alert> : <>
      <Row className="mt-5">
      <Col md={8}>
        <h1>SHIPPING</h1>
        <Button className="shipping-btn" onClick={()=>setForm(true)}><AddIcon/>Add New Address</Button>
        <Row className="mt-3">
        {addressList.map((address)=>{
          return <Card className="addresscard mx-2" onClick={()=>onSelect(address)}>
            {select.address === address.address && <CheckIcon />}
            <Card.Title>{address.addressName}</Card.Title>
              <Card.Text>{address.userName} </Card.Text>
              <br></br>
              <Card.Text>{address.address}</Card.Text>
            <Card.Text>{address.city} {address.state}</Card.Text>
          </Card>
        })}
        </Row>
      </Col>
      <Col md={4} className="checkout-price">
        <h1>Order Summary</h1>
        <div className="checkout-pricepart" >
        <p>Item(s):</p>
        <p>${total}</p>
        </div>
        <div className="checkout-pricepart"><p>Delivery:</p>
        {delivery !==0 ? <p>${delivery}</p> : <p>Free</p>}
        </div>
        <hr/>
        <div className="checkout-pricepart">
          <p>Total:</p>
          <p>${total+delivery!}</p>
          </div>
      </Col>
      </Row>
      <Row>
      {form && <Checkoutform onClose={()=>setForm(false)}/>}
      </Row>
      <Row>
      <Col md={8}> 
      {select.address && <div className="mt-5">
    <h1>DELIVERY</h1>
    <h5>How soon you would like to receive the products?</h5>
    <div className="delivery-options">
    <Card className="delivery-card mt-3">
      <Card.Body onClick={selectFreeDeli}>
        {selectDeli && <CheckIcon/>}
        <Card.Text>Get it by</Card.Text>
        <Card.Text>{threedays[0]} {threedays[2]} {threedays[1]}</Card.Text>
        {total <1000 ? <Card.Text>$15</Card.Text> : <Card.Text>Free</Card.Text>}
      </Card.Body>
    </Card>
    <Card className="delivery-card mt-3">
    <Card.Body onClick={selectDelivery}>
    {selectExtraDeli && <CheckIcon/>}
        <Card.Text>Get it by </Card.Text>
        <Card.Text>{tomorrow[0]} {tomorrow[2]} {tomorrow[1]}</Card.Text>
        <Card.Text>$39</Card.Text>
      </Card.Body>
    </Card></div>
  </div>}
      </Col>
    </Row>
      {(selectDeli || selectExtraDeli) && <Row className="mt-5">
      <Col md={8}>
        <Payment onClose={onClose} onSubmit={onSubmit}/>
        </Col>
        </Row>}
        </>}
    </Container>
  )
}