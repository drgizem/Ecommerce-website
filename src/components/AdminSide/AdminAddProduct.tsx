import { Form,Container } from "react-bootstrap"
import { useState,useEffect } from "react"
import { Button } from "@mui/material"
import { Category, Product,SubCategory } from "../../types/types"
import { v4 as uuid } from 'uuid';
import {storage} from '../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {handleProductAdd,getCategory,getSubCategory} from '../../firebase/ref'

const AdminAddProduct = () => {
    const [product,setProduct] = useState<Product>({
        id:uuid(),
        title:'',
        description:'',
        image:'',
        price:0,
        category:-1,
        subcategory:-1,
        stock:0
    })
    const [categories,setCategories] = useState<Category[]>([])
    const [subcategories,setSubcategories] = useState<SubCategory[]>([])
    const handle = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleProductAdd(`${categories[product.category].name}`,`${subcategories[product.subcategory].name}`,{
            id:product.id,
            title:product.title,
            description:product.description,
            image:product.image,
            price:product.price,
            stock:product.stock,
            category:product.category,
            subcategory:product.subcategory
        })
       setProduct({
        id:uuid(),
        title:'',
        description:'',
        image:'',
        price:0,
        category:-1,
        subcategory:-1,
        stock:0
         })

    }
    
    const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const image = e.target.files[0]
            const storageRef = ref(storage,`images/${product.id}`)
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
                    setProduct({...product,image:downloadURL})
                })
            }
            )
    }
    }
   
    useEffect(() => {
        getCategory().then((data) => {
            setCategories(data)
        })
    },[])
    useEffect(() => {
        
        if(product.category > -1){
            getSubCategory(categories[product.category].id).then((data) => {
                setSubcategories(data)
                setProduct({...product,subcategory:-1})
            })
        }
        else {
            setSubcategories([])
            setProduct({...product,subcategory:-1})
        }
        
    },[product.category])
    return (
        <Container className="admin">
            <h1>Admin Product Saver</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={product.title} onChange={handle} name='title' type="text" placeholder="Enter title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={product.description} onChange={handle} name='description' as="textarea" rows={3} placeholder="Enter description" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control  onChange={handleImage} name='image' type="file" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={product.price} onChange={handle} name='price' type="number" placeholder="Enter price" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control value={product.category}  onChange={handle} name='category' as="select">
                        <option value={-1}>Choose...</option>
                        {categories.map((category,index) => (
                            <option value={index} key={category.id}>{category.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Control value={product.subcategory} onChange={handle} name='subcategory' as="select">
                        <option value={-1}>Choose...</option>
                        {subcategories.map((subcategory,index) => (
                            <option value={index} key={index}>{subcategory.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>    
                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control value={product.stock} onChange={handle} name='stock' type="number" placeholder="Enter stock" />
                </Form.Group>  
                <Button type="submit" variant="contained" color="primary"> Submit </Button>
                </Form>     
        </Container>
    )
}

export default AdminAddProduct