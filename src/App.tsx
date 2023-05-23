import {Navbarpart} from "./components/Navbar"
import './App.css';
import {useState,useEffect,useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Category, SubCategory } from "./types";
import { getCategory, getProducts, getSubCategory} from "./firebase/ref";
import { Categorypart } from "./components/Category";
import { SubCategorypart } from "./components/SubCategory";
import { Context } from "./components/Context";
import { subcategories } from "./firebase/ref";

function App() {
  const [categoryList,setCategoryList]=useState<Category[]>([])
  const [subCategoryList,setSubCategoryList]=useState<SubCategory[]>([])
  const {state,dispatch}=useContext(Context)

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
  return (
    <div className="App">
      <Navbarpart/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {categoryList.map((category)=>{
        return <Route key={category.id} path={`/${category.name}`} element={<Categorypart onFetchSub={()=>onfetchsub(category.id)} subCat={subCategoryList} category={category} />}/>
      })}
      {subcategories.map((item)=>{
          return <Route key={item.name} path={`/${item.name}`} element={<SubCategorypart subcategory={item}/>}/>
        })}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
