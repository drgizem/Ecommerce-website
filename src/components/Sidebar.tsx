import { Category,SubCategory } from "../types/types"
import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"

import {getCategory,getSubCategory} from "../firebase/ref"


const Sidebar = () => {
  
  const [catList,setCatList]=useState<Category[]>([])
  const [selectedCat,setSelectedCat]=useState<Category>({} as Category)
  const [subCat,setSubCat]=useState<SubCategory[]>([])
    
    const navigate=useNavigate()
   
  
    useEffect(()=>{
      const uploadCat=async()=>{
          const fetchedCat=await getCategory()
          setCatList(fetchedCat)
      }
      uploadCat()
      },[])

    useEffect(()=>{
      const uploadSub=async()=>{
        if(selectedCat){
          const fetchedSub=await getSubCategory(selectedCat.id)
          setSubCat(fetchedSub)
        }
      }
      uploadSub()
    },[selectedCat])

    const handleCat=(id:string)=>{
      const cat=catList.find((item)=>item.id===id)
       cat&& setSelectedCat(cat)
    }
    
    return (
      <div className="sidebar">
      <div className="sidebar-category" >
        {catList.map((category)=>{
          return <>
            <div className="sidebar-item"    key={category.id} style={{color:"#0a090cff"}} >
              <div className="sidebar-item-name" onMouseOver={()=>handleCat(category.id)} onClick={()=>navigate(`/categories/${category.name}`)} >
                <p>{category.name}</p>
              </div>
              <div className="sidebar-subcategory">
              {subCat.map((item,index)=>{return <div 
              className="sidebar-subitem" 
              key={index}
              onClick={()=>navigate(`/subcategories/${item.name}`)} 
              style={{color:"#0a090cff"}}>
                {item.name}
              </div>}
              )}
              </div>
              </div>
          </> 
                })
            }
            </div>
            </div>

    )
}

export default Sidebar