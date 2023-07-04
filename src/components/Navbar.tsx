import {Navbar,Form,Col, Dropdown,Card} from "react-bootstrap"
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../styles/Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useContext,useState,useEffect } from "react";
import { Context } from "./Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Product,SubCategory,Category } from "../types/types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCategory,getSubCategory,filterProducts } from "../firebase/ref";



export const   Navbarpart=()=>{
  const {state,dispatch}=useContext(Context)
  const [search,setSearch]=useState("")
  const [width,setWidth]=useState<number>(window.innerWidth)
  const [show,setShow]=useState<boolean>(false)
  const [catList,setCatList]=useState<Category[]>([])
  const [selectedCat,setSelectedCat]=useState<Category>({name:'',id:''})
  const [subCat,setSubCat]=useState<SubCategory[]>([])
  const [filteredProducts,setFilteredProducts]=useState<Product[]>([])

  useEffect(()=>{
    const uploadCat=async()=>{
        const fetchedCat=await getCategory()
        setCatList(fetchedCat)
    }
    uploadCat()
    },[])
  useEffect(()=>{
    const uploadSub=async()=>{
      if(selectedCat.id!==''){
        const fetchedSub=await getSubCategory(selectedCat.id)
        setSubCat(fetchedSub)
      }
    }
    uploadSub()
  },[selectedCat])

  useEffect(()=>{
    window.addEventListener("resize",()=>setWidth(window.innerWidth))
    
  }
  ,[width])
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
  navigate(`/products/${product.title}`)
  setSearch("")
}
const handleCat=(id:string)=>{
  const cat=catList.find((item)=>item.id===id)
  cat&&setSelectedCat(cat)
}
const handleToggle=()=>{
  setShow(!show)
  setSelectedCat({name:'',id:''})
}

const handleSubcatClick=(sub:string)=>{
  navigate(`/subcategories/${sub}`)
  setSearch("")
  setShow(false)
}
useEffect(()=>{
  const uploadProducts=async()=>{
    const fetchedProducts=await filterProducts(search)
    setFilteredProducts(fetchedProducts)
  }
  uploadProducts()
},[search])
  return(
    <Navbar   >
      {width<1070 && <Col className="navbar-menu">
        <Dropdown show={show} >
          <Dropdown.Toggle onClick={handleToggle} className="dropdown-toggle" id="dropdown-basic">
          <MenuIcon/>
          </Dropdown.Toggle>
        {selectedCat.name===''?   <Dropdown.Menu >
          {catList.map(category=>{
            return <Dropdown.Item key={category.id} className="dropdown_text" onClick={()=>handleCat(category.id)}>{category.name}</Dropdown.Item>
          })
          }
          </Dropdown.Menu>:<Dropdown.Menu >
          <Dropdown.Item className="dropdown_text" onClick={()=>setSelectedCat({id:'',name:''})}><ArrowBackIcon/> Back to Categories</Dropdown.Item>
          {subCat.map((sub,index)=>{
            return <Dropdown.Item key={index} className="dropdown_text" onClick={()=>handleSubcatClick(sub.name)}>{sub.name}</Dropdown.Item>
          })
          }
          </Dropdown.Menu>}
        </Dropdown>
      </Col>}
        <Col className="navbar-brand">
        <Link to="/" ><EmojiPeopleIcon/>Buy buy</Link>
        </Col>
       
        <Col className="navbar-search">
          <Form className="navbar-searchbar">
        <Form.Control className="mx-2" placeholder="Search a product" onChange={(e)=>setSearch(e.target.value)} value={search}/>
       </Form>
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
      {search !=="" &&  <div className="mt-2 navbar-searchitems">{filteredProducts.map(product=>{
        return <Card key={product.id} className="search-bar mb-1" onClick={()=>handleClick(product)}>
          <Card.Img alt="" src={product.image} style={{width:"80px",height:"100px"}}/>
         <Card.Body>{product.title}</Card.Body>
        </Card>
      })}</div>}
    </Navbar>
  )
}