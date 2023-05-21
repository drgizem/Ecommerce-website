import {Navbarpart} from "./components/Navbar"
import './App.css';
import {useState,useEffect,useCallback} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Category, Product } from "./types";
import { getCategory, getProducts, getSubCategory} from "./firebase/ref";
import { Categorypart } from "./components/Category";
import { SubCategory } from "./components/SubCategory";

function App() {
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [subCatList,setSubCatList]=useState<Category[]>([])
  const [productList,setProductList]=useState<Product[]>([])

  useEffect(()=>{
   const uploadCat=async()=>{
      const fetchedCat=await getCategory()
      setCategoryList(fetchedCat)
   }
   uploadCat()
  },[])
  const onFetchSub=async(id:string)=>{
    const fetchedSub=await getSubCategory(id)
    setSubCatList(fetchedSub)  
  }
  const onProducts=async(id1:string,id2:string)=>{
    const fetchProduct=await getProducts(id1,id2)
    setProductList(fetchProduct)
}


  return (
    <div className="App">
      <Navbarpart/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {categoryList.map((category)=>{
        return <Route key={category.id} path={`/${category.name}`} element={<Categorypart category={category} subCat={subCatList} onFetchSub={()=>onFetchSub(category.id)}/>}/>
      })}
      {categoryList.map((category)=>{
        return subCatList.map((item)=>{
          return <Route key={item.id} path={`/${item.name}`} element={<SubCategory getProducts={()=>onProducts(category.name,item.name)} productList={productList} subcategory={item}/>}/>
        })
      })}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>

  );
}

export default App;
