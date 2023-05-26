import { useState,useEffect } from "react"
import { Category,Product,SubCategory } from "../../types/types"
import {getProducts,getCategory,getSubCategory,handleProductAdd} from '../../firebase/ref'
import { Button, Container,Form } from "react-bootstrap"

import {storage} from '../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


type Selected={
    category:number,
    subcategory:number
}

const AdminEdit = () => {
    const [categories,setCategories] = useState<Category[]>([])
    const [subcategories,setSubcategories] = useState<SubCategory[]>([])
    const [selectedCategory,setSelectedCategory] = useState<Selected>({category:-1,subcategory:-1})
    const [products,setProducts] = useState<Product[]>([])
    const [selectedProduct,setSelectedProduct] = useState<number>(-1)

    useEffect(() => {
        getCategory().then((data) => {
            setCategories(data)
        })
    },[])
    useEffect(() => {
        if(selectedCategory.category >-1){
            getSubCategory(categories[selectedCategory.category].id).then((data) => {
            setSubcategories(data)
            setSelectedCategory({...selectedCategory,subcategory:-1})
            
            })
        }
        else{
            setSubcategories([])
            setSelectedCategory({...selectedCategory,subcategory:-1})
            setProducts([])
            setSelectedProduct(-1)
        }
    },[selectedCategory.category])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setSelectedCategory({...selectedCategory,[e.target.name]:Number(e.target.value)})
    }

    const handleProductChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let product=products[Number(selectedProduct)]
        let newProduct:Product = {
            ...product,
            [e.target.name]:e.target.value
        }
        setProducts([...products.slice(0,Number(selectedProduct)),newProduct,...products.slice(Number(selectedProduct)+1)])
        
    }
    

    useEffect(() => {
        if(selectedCategory.subcategory >-1){
            getProducts(categories[selectedCategory.category].name,subcategories[selectedCategory.subcategory].name).then((data) => {
                setProducts(data)
                setSelectedProduct(-1)
            })
        }
        else{
            setProducts([])
            setSelectedProduct(-1)
        }
    },[selectedCategory.subcategory])

    const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0]
            const storageRef = ref(storage,`images/${products[Number(selectedProduct)].id}`)
            const uploadTask = uploadBytesResumable(storageRef,image)
            uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot)
            }
            ,(error) => {
                console.log(error)
            }
            ,() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    let product=products[Number(selectedProduct)]
                    let newProduct:Product = {
                        ...product,
                        image:downloadURL
                    }
                    setProducts([...products.slice(0,Number(selectedProduct)),newProduct,...products.slice(Number(selectedProduct)+1)])
                })
            }
            )
    }
    }
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleProductAdd(categories[selectedCategory.category].name,subcategories[selectedCategory.subcategory].name,products[selectedProduct])
    }


    return (
      <Container>
        <h1>Admin Edit</h1>
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Category</Form.Label>
                <Form.Control onChange={handleChange} value={selectedCategory.category} name="category" as="select">
                    <option value={-1}>Select Category</option>
                    {categories.map((category,index)=>{return <option key={category.id} value={index}>{category.name}</option>})}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control onChange={handleChange} value={selectedCategory.subcategory} name="subcategory" as="select" >
                    <option value={-1}>Select Subcategory</option>
                    {subcategories.map((subcategory,index)=>{return <option key={index} value={index}>{subcategory.name}</option>})}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Product</Form.Label>
                <Form.Control onChange={(e)=>setSelectedProduct(Number((e.target.value)))} as="select">
                    <option value={-1} >Select Product</option>
                    {products.map((product,index)=>{return <option key={index} value={index}>{product.title} {product.description}</option>})}
                </Form.Control>
            </Form.Group>
    
        </Form>

        {selectedProduct > -1 && <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleProductChange} name="title" type="text" placeholder="Title" value={products[Number(selectedProduct)].title} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleProductChange} name="description" type="text" placeholder="Description" value={products[Number(selectedProduct)].description} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={handleProductChange} name="price" type="text" placeholder="Price" value={products[Number(selectedProduct)].price} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <img src={products[Number(selectedProduct)].image} alt="product" />
                <Form.Control onChange={handleImage} type="file" placeholder="Image"  />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Stock</Form.Label>
                
                <Form.Control onChange={handleProductChange} name="stock" type="text" placeholder="Stock" value={products[Number(selectedProduct)].stock} />
            </Form.Group>
            <Button variant="primary" type="submit"> Submit </Button>
            </Form>}
      </Container>
    )
}

export default AdminEdit