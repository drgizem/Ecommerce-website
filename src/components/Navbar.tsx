import {Navbar,Form,Col,Nav} from "react-bootstrap"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles/Navbar.css"
import { Link } from "react-router-dom";

export const Navbarpart=()=>{

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
      <Nav.Link href="/login">Login</Nav.Link>
      <ShoppingCartIcon/>
      </Col>
    </Navbar>
  )
}