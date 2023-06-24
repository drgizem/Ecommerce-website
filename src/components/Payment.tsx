import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"



type Props={
  onClose():void,
  onSubmit():void
}
export const Payment=({onClose,onSubmit}:Props)=>{
  const [card,setCard]=useState({
    userName:"",
    cardNumber:undefined,
    month:"Month",
    year:"Year"
  })
  const [cardError,setCardError]=useState<boolean>()
  const [cardDate,setCardDate]=useState<boolean>()
  const [userError,setUserError]=useState<boolean>()

const months=["Month","01","02","03","04","05","06","07","08","09","10","11","12"]
const years=["Year","23","24","25","26","27","28","29","30","31","32","33","34"]


const handleChange=(e:any)=>{
  const {name,value}=e.target
  setCard((pre)=>{
    return {...pre,[name]:value}
  })
}
const handleSubmit=(e:any)=>{
  e.preventDefault()
    if(String(card.cardNumber).split("").length !==16){
      setCardError(true)
    } else {
      setCardError(false)
    }
    if(card.year ==="Year"){
      setCardDate(true)
    }else {
      setCardDate(false)}
    if(card.userName ===""){
      setUserError(true)
    }else {
      setUserError(false)
    }
    if(userError===false && cardDate===false && cardError===false){
      onSubmit()
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="checkout-form mb-5">
      <h1>PAYMENT</h1>
      <Form.Group>
        <Form.Label className="checkout-formlabel mt-2">Cardholder Name (exactly as shown on card)</Form.Label>
        <Form.Control onChange={handleChange} style={userError ? {borderColor:"#dc3545",backgroundImage:"none"} : {borderColor:"#ced4da"}} type="text" value={card.userName || ""} name="userName"/>
      </Form.Group>
      <Form.Group>
        <Form.Label className="checkout-formlabel mt-2">Card Number</Form.Label>
        <Form.Control onChange={handleChange} type="number" style={cardError ? {borderColor:"#dc3545",backgroundImage:"none"} : {borderColor:"#ced4da"}} value={card.cardNumber} name="cardNumber" className="checkout-formnumber"/>
        {cardError && <Form.Text className="error-text mb-1">Card Number should be 16 digits!</Form.Text>}
      </Form.Group>
      <Form.Group className="checkout-formselect mt-3">
        <Form.Label className="checkout-formselectlabel mt-2">Expiration Date</Form.Label>
        <div className="d-flex">
        <Form.Select style={cardDate ? {borderColor:"#dc3545",backgroundImage:"none"} : {borderColor:"#ced4da"}} className="m-0" name="month" value={card.month || ""} onChange={handleChange}>
          {months.map((item)=>{
            return <option   value={item} key={item}>{item}</option>
          })}
        </Form.Select>
        <Form.Select style={cardDate ? {borderColor:"#dc3545",backgroundImage:"none"} : {borderColor:"#ced4da"}} className="mx-2 m-0" name="year" value={card.year || ""} onChange={handleChange}>
        {years.map((item)=>{
            return <option   value={item} key={item}>{item}</option>
          })}
        </Form.Select>
        </div>
      </Form.Group>
      <hr/>
      <Button className="shipping-btn mt-3" onClick={onClose}>Cancel</Button>
      <Button className="shipping-btn mt-3 mx-3" type="submit" >Complete Payment</Button>
    </Form>
  )
}