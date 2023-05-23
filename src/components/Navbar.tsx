import {Navbar,Form,Col, Dropdown} from "react-bootstrap"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles/Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import { Context } from "./Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const Navbarpart=()=>{
  const {state,dispatch}=useContext(Context)
  const navigate=useNavigate()

  const onSignOut=()=>{
    signOut(auth)
    dispatch({
      type:"logout"
    })
    localStorage.setItem("user","")
    navigate("/")
  }

  return(
    <Navbar>
        <Col className="navbar-brand">
        <Link to="/" style={{color:"white",textDecoration:"none"}}><EmojiPeopleIcon/>Buy buy</Link>
        </Col>
        <Col className="navbar-search">
        <Form.Control placeholder="Search a product"/>
      <SearchIcon/>
      </Col>
      <Col className="navbar-user">
      {state.user.name==="" ? <Link to='/login' className="signin">Login</Link>
            : (
              <Dropdown drop="start" className="dropdown-login">
                <Dropdown.Toggle className="bg-dark" style={{border:"none"}} id="dropdown-basic">
                 <PersonIcon/>
               </Dropdown.Toggle>
                <Dropdown.Menu >
                <Dropdown.Item className="dropdown_text email">{state.user.email}</Dropdown.Item>
                 <Dropdown.Item href="/" className="dropdown_text" onClick={onSignOut}>Sign out</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>)  }
      <ShoppingCartIcon/>
      </Col>
    </Navbar>
  )
}