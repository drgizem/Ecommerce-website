import { Button, Form } from "react-bootstrap"
import { useContext, useState } from "react";
import { Address } from "../types/types";
import {getDoc,doc,setDoc} from "firebase/firestore"
import {db} from "../firebase/firebase"
import { Context } from "./Context";
import "../styles/Checkout.css"

type Props={
  onClose():void
}

export const Checkoutform=({onClose}:Props)=>{
  const [validated, setValidated] = useState<boolean>();
  const [address,setAddress]=useState<Address>({} as Address)
  const {state}=useContext(Context)

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setAddress((pre)=>{
      return {...pre,[name]:value}
    })
  }
  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setValidated(true);
      const userRef=doc(db,"users",`${state.user.id}`)
      const listRef=await getDoc(userRef)
      const dbList=listRef.data()
      const newAdd={
        userName:address.userName,
        city:address.city,
        state:address.state,
        country:address.country,
        address:address.address,
        phone:address.phone,
        zipcode:address.zipcode,
        addressName:address.addressName
      }
      const newAddress=[...dbList!.address,newAdd]
      setDoc(userRef,{...dbList!,address:newAddress})
      setAddress({userName:"",
        city:"",
        state:"",
        country:"",
        address:"",
        phone:0,
        zipcode:0,
        addressName:""})
        onClose()
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="checkout-form">
      <h3>Add Address</h3>
      <Form.Group className="mt-2">
        <Form.Label className="checkout-formlabel">Full name (First and Last Name)</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.userName} name="userName" required type="text"/>
      </Form.Group>
      <Form.Group className="mt-2">
      <Form.Label className="checkout-formlabel">Country/Region</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.country} name="country" required />
      </Form.Group>
      <Form.Group className="mt-2">
      <Form.Label className="checkout-formlabel">Phone</Form.Label>
        <Form.Control className="checkout-formnumber" onChange={handleChange} value={0 || address.phone} name="phone" required type="number"/>
      </Form.Group>
      <Form.Group className="mt-2">
      <Form.Label className="checkout-formlabel">Address</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.address} name="address" required type="text" placeholder="Start typing your address"/>
      </Form.Group>
      <div className="d-flex">
      <Form.Group className="mt-2">
      <Form.Label className="checkout-formlabel">City</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.city} name="city" required type="text"/>
      </Form.Group>
      <Form.Group className="mt-2 mx-2">
      <Form.Label className="checkout-formlabel">State</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.state} type="text" name="state" required/>
      </Form.Group>
      </div>
      <div className="d-flex">
      <Form.Group className="mt-2">
      <Form.Label className="checkout-formlabel">ZIP Code</Form.Label>
        <Form.Control onChange={handleChange} className="checkout-formnumber" value={0 || address.zipcode} name="zipcode" required type="number" />
      </Form.Group>
      <Form.Group className="mt-2 mx-2">
      <Form.Label className="checkout-formlabel">Save Address As</Form.Label>
        <Form.Control onChange={handleChange} value={"" || address.addressName} required name="addressName" type="text" placeholder="Untitled"/>
      </Form.Group></div>
      <Button className="shipping-btn mt-3" onClick={onClose}>Cancel</Button>
      <Button type="submit" className="shipping-btn mx-3 mt-3" >Save</Button>
    </Form>
  )
}