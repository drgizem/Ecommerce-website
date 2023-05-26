import {Navbarpart} from "./components/Navbar"
import './App.css';
import {useState,useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Category, Product, SubCategory } from "./types";
import { getCategory, getProductByCategory, getSubCategory} from "./firebase/ref";
import { Categorypart } from "./components/Category";
import { SubCategorypart } from "./components/SubCategory";
import { Productpart } from "./components/Product";
import { Cart } from "./components/Cart";

function App() {
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [subCategoryList,setSubCategoryList]=useState<SubCategory[]>([])
  const [allSubCat,setAllSubCat]=useState<SubCategory[]>([])
  const [productList,setProductList]=useState<Product[]>([])


  useEffect(()=>{
   const uploadCat=async()=>{
      const fetchedCat=await getCategory()
      setCategoryList(fetchedCat)
   }
   uploadCat()
  },[])

useEffect(()=>{
  const fetchPro=async()=>{
    let temp1:SubCategory[]=[]
    let temp2:Product[]=[]
    for(let i=0;i<categoryList.length;i++){ 
        const fetch1=await getSubCategory(categoryList[i].id)
        temp1=[...temp1,...fetch1]
        const fetch2=await getProductByCategory(categoryList[i].id,categoryList[i].name)
        temp2=[...temp2,...fetch2]
    } 
    setAllSubCat(temp1)
    setProductList(temp2)
  }
  fetchPro()
},[categoryList])


  return (
    <div className="App">
      <Navbarpart products={productList}/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {categoryList.map((category)=>{
        return <Route key={category.id} path={`/${category.name}`} element={<Categorypart />}/>
      })}
      {allSubCat.map((item)=>{
            return <Route key={item.name} path={`/${item.name}`} element={<SubCategorypart subcategory={item}/>}/>
        })
      }
      {productList.map((item)=>{
        return <Route key={item.id} path={`/${item.title}`} element={<Productpart />}/>
      })}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
