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
import { subcategories } from "./firebase/ref";
import { Productpart } from "./components/Product";

function App() {
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [subCategoryList,setSubCategoryList]=useState<SubCategory[]>([])
  const [productList,setProductList]=useState<Product[]>([])


  useEffect(()=>{
   const uploadCat=async()=>{
      const fetchedCat=await getCategory()
      setCategoryList(fetchedCat)
   }
   uploadCat()
  },[])
const onfetchsub=async(id:string)=>{
  const fetch=await getSubCategory(id)
  setSubCategoryList(fetch)
}
useEffect(()=>{
  const fetchPro=async()=>{
    let temp:Product[]=[]
    for(let i=0;i<categoryList.length;i++){ 
        const fetch=await getProductByCategory(categoryList[i].id,categoryList[i].name)
        temp=[...temp,...fetch]
    } 
    setProductList(temp)
  }
  fetchPro()
},[categoryList])


  return (
    <div className="App">
      <Navbarpart products={productList}/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {categoryList.map((category)=>{
        return <Route key={category.id} path={`/${category.name}`} element={<Categorypart onFetchSub={()=>onfetchsub(category.id)} subCat={subCategoryList} category={category} />}/>
      })}
      {subcategories.map((item)=>{
            return <Route key={item.name} path={`/${item.name}`} element={<SubCategorypart subcategory={item}/>}/>
        })
      }
      {productList.map((item)=>{
        return <Route key={item.id} path={`/${item.title}`} element={<Productpart />}/>
      })}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
