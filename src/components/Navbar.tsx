import {Navbar,Form,Col, Dropdown,Card} from "react-bootstrap"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles/Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useContext,useState } from "react";
import { Context } from "./Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Product } from "../types";

type Props={
  products:Product[]
}
export const Navbarpart=({products}:Props)=>{
  const {state,dispatch}=useContext(Context)
  const [search,setSearch]=useState("")
  const navigate=useNavigate()

  const onSignOut=()=>{
    signOut(auth)
    dispatch({
      type:"logout"
    })
    localStorage.setItem("user","")
    navigate("/")
  }
const handleClick=(product:Product)=>{
  dispatch({
    type:"select_product",payload:product
  })
  navigate(`/${product.title}`)
  setSearch("")
}

  return(<>
    <Navbar className="navbar">
        <Col className="navbar-brand">
        <Link to="/" style={{color:"white",textDecoration:"none"}}><EmojiPeopleIcon/>Buy buy</Link>
        </Col>
        <Col className="navbar-search">
          <Form className="navbar-searchbar">
        <Form.Control className="mx-2" placeholder="Search a product" onChange={(e)=>setSearch(e.target.value)} value={search}/>
        <SearchIcon/></Form>
      </Col>
      <Col className="navbar-user">
      {state.user.name==="" ? <Link to='/login' className="signin">Login</Link>
            : (
              <Dropdown drop="start" className="dropdown-login">
                <Dropdown.Toggle className="dropdown-toggle" style={{border:"none"}} id="dropdown-basic">
                 <PersonIcon/>
               </Dropdown.Toggle>
                <Dropdown.Menu >
                <Dropdown.Item className="dropdown_text email">{state.user.email}</Dropdown.Item>
                 <Dropdown.Item href="/" className="dropdown_text" onClick={onSignOut}>Sign out</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>)  }
      <Link to="/cart" className="signin"><ShoppingCartIcon/></Link>
      </Col>
      {search !=="" &&  <div className="mt-2 navbar-searchitems">{products.filter(product=>product.title.toLowerCase().includes(search) || 
      product.description.toLowerCase().includes(search)).map(product=>{
        return <Card  className="search-bar mb-1" onClick={()=>handleClick(product)}>
          <Card.Img alt="" src={product.image} style={{width:"80px",height:"100px"}}/>
         <Card.Body>{product.title}</Card.Body>
        </Card>
      })}</div>}
    </Navbar>
  </>)
}